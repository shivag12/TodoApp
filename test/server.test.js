const {app} = require("./../server/server");
const {user} = require("./../model/usermodel/user");
const request = require("supertest");
const expect = require("expect");
const {ObjectID} = require("mongodb");
const mocha = require("mocha");

//creating the unique id and making it accessble to all the testcases
var id = ObjectID();
console.log(id);

//precondition data to verify the functionality.
before((done)=>{
   
    var testuser = new user({
        _id : id,
        name : "test",
        email : "testg12@in.ibm.com"
    })

    testuser.save(done);
    
})

//clearing up the test data after completing the testcase
after((done)=>{
    user.findByIdAndRemove(id).then(()=>{
        done();
    })
})

describe("GET /user",()=>{
    it("Should return the user object",(done)=>{    
        console.log();            
        request(app)
            .get(`/user/${id}`)           
            .expect(200)
            .expect((res)=>{                
                expect(res.body.name).toBe("test")
            })    
            .end((err,res)=>{
                if(err) return done(err);
                done();
            })
    })

    it("Should return 404 error",(done)=>{
        request(app)
            .get("/user/b3808147c4fa2a147af3b7")
            .expect(401)
            .end((err,res)=>{
                if(err) return done(err);
                done();
            })
    })

    it("Should return no records",(done)=>{
        request(app)
            .get("/user/69b3808147c4fa2a147af3b7")            
            .expect(401)
            .end((err,res)=>{
                if(err) return done(err);
                done();
            })
    })
})

describe("GET /finduser",()=>{
    it("Should return the docs by name",(done)=>{
        request(app)
            .get("/finduser/?name=test")            
            .expect(200)
            .expect((res)=>{
                expect(res.body[0].name).toBe("test");
            })
            .end((err,res)=>{
                if(err) return done(err);
                done();
            })
    })

    it("Should return zero docs",(done)=>{
        request(app)
            .get("/finduser/?name=sh")
            .expect(404)
            .end((err,res)=>{
                if(err) return done(err);
                done();
            })
    })
})

// describe("POST /user",()=>{
//     it("Should insert the user",(done)=>{
//         request(app)
//         .post("/user")
//         .send({
//             name : "shiva",
//             email : "shivag1@in.ibm.com"
//         })
//         .expect(200)
//         .end((err,res)=>{
//             if(!err) done();
//         })
//     })
// })