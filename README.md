
# Radish - A reddit clone API  
- This project is made for the purpose of learning, only focus on feature, ignore some implementations. 
- Documentation included in both Postman and OpenAPI. 
# Todo


# Features
- Auth JWT 
- Cloudinary 
- Pagination 
- Centralized error handling 
- CRUDs posts,subreddits,comments
# Notes 
- some basic CRUD are not implemented. 
- api not tested
# Learned
[Source](https://github.com/amand33p/reddish#reddish---a-reddit-clone---mern)

- index.d.ts includes custom property for request
- Use jwt for auth
- typing for model
- use asyncHandler to avoid try catch
## Tools Specific
- use save() for updating mongodb, lean() for query, populate() for references
- mongodb query operator ($)

![db_diagram](radish-db-diagram(3).png)

### db design decisions 
- Comment reply is 1-1 rel to itself  

Extra field on User: subreddits, posts
- user can query his subscribed subreddit, created post  

notes: 
- relationship and sql diagram differs, in many to many, relationship table, should 
i have both fields?  
- notice extra fields in reflection





