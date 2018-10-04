const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/ads/";
const sequelize = require("../../src/db/models/index").sequelize;
const Ads = require("../../src/db/models").Ads;

beforeEach((done) => {
    this.ad;
    sequelize.sync({ force: true }).then((res) => {

        Ads.create({
            title: "We have something for you!",
            description: "Ads"
        })
            .then((ad) => {
                this.ad = ad;
                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });

    });

});

describe("routes : ads", () => {

    describe("GET /ads", () => {

        it("should return a status code 200 and show all ads", (done) => {

            request.get(base, (err, res, body) => {
                expect(res.statusCode).toBe(200);
                expect(err).toBeNull();
                expect(body).toContain("Ads");
                done();
            });
        });

    });

    describe("GET /ads/new", () => {

        it("should render a new ad form", (done) => {
            request.get(`${base}new`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("New Ad");
                done();
            });
        });

    });

    describe("POST /ads/create", () => {
        const options = {
            url: `${base}create`,
            form: {
                title: "beatles songs",
                description: "What's your favorite Beatles' song?"
            }
        };

        it("should create a new topic and redirect", (done) => {

            request.post(options,

                (err, res, body) => {
                    Ads.findOne({ where: { title: "beatles' song" } })
                        .then((ad) => {
                            expect(res.statusCode).toBe(303);
                            expect(ad.title).toBe("beatles' song");
                            expect(ad.description).toBe("What's your favorite Beatle's song?");
                            done();
                        })
                        .catch((err) => {
                            console.log(err);
                            done();
                        });
                }
            );
        });
    });

    describe("GET /ads/:id", () => {

        it("should render a view with the selected ad", (done) => {
            request.get(`${base}${this.ad.id}`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("Ads");
                done();
            });
        });

    });

    describe("POST /ads/:id/destroy", () => {

        it("should delete the ad with the associated ID", (done) => {

            Ads.all()
                .then((ads) => {

                    const adCountBeforeDelete = ads.length;

                    expect(adCountBeforeDelete).toBe(1);

                    request.post(`${base}${this.ad.id}/destroy`, (err, res, body) => {
                        Ads.all()
                            .then((ads) => {
                                expect(err).toBeNull();
                                expect(ads.length).toBe(adCountBeforeDelete - 1);
                                done();
                            })

                    });
                });

        });

    });

    describe("GET /ads/:id/edit", () => {

        it("should render a view with an edit ads form", (done) => {
            request.get(`${base}${this.ad.id}/edit`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("Edit Ad");
                done();
            });
        });

    });

    describe("POST /ads/:id/update", () => {

        it("should update the ads with the given values", (done) => {
            const options = {
                url: `${base}${this.ad.id}/update`,
                form: {
                    title: "Smoking ads",
                    description: "They are bad"
                }
            };

            request.post(options,
                (err, res, body) => {

                    expect(err).toBeNull();

                    Ads.findOne({
                        where: { id: this.ad.id }
                    })
                        .then((ad) => {
                            expect(ad.title).toBe("Smoking ads");
                            done();
                        });
                });
        });

    })

});