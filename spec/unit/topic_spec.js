const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const User = require("../../src/db/models").User;

describe("Topic", () => {

    beforeEach((done) => {
        this.topic;
        this.post;
        this.user;
   
        sequelize.sync({force: true}).then((res) => {
   
   // #2
          User.create({
            email: "starman@tesla.com",
            password: "Trekkie4lyfe"
          })
          .then((user) => {
            this.user = user; //store the user
   
   // #3
            Topic.create({
              title: "Expeditions to Alpha Centauri",
              description: "A compilation of reports from recent visits to the star system.",
   
   // #4
              posts: [{
                title: "My first visit to Proxima Centauri b",
                body: "I saw some rocks.",
                userId: this.user.id
              }]
            }, {
   
   // #5
              include: {
                model: Post,
                as: "posts"
              }
            })
            .then((topic) => {
              this.topic = topic; //store the topic
              this.post = topic.posts[0]; //store the post
              done();
            })
          })
        });
      });

  describe("#create()", () => {

      it("should create a post object with a title, body, and assigned topic", (done) => {
        Topic.create({
          title: "How to maintain health during long voyages through space.",
          description: "1. Make sure there is plenty of water.",
          topicId: this.topic.id
        })
        .then((topic) => {
          expect(topic.title).toBe("How to maintain health during long voyages through space.");
          expect(topic.description).toBe("1. Make sure there is plenty of water.");
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      });

      it("should not create a topic with missing title, or description", (done) => {
        Topic.create({
          title: "How to maintain health during long voyages through space."
        })
        .then((topic) => {
          done();
        })
        .catch((err) => {
          expect(err.message).toContain("Topic.description cannot be null");
          done();
        })
      });

    });
    describe("#getPosts()", () => {

      it("should return an array of posts associated with topic", (done) => {

        this.topic.getPosts()
        .then((associatedPosts) => {
          expect(associatedPosts[0].title).toBe("My first visit to Proxima Centauri b");
          expect(associatedPosts[0].body).toBe("I saw some rocks.");
          expect(associatedPosts[0].topicId).toBe(this.topic.id);
          done();
        });

      });

    });
});