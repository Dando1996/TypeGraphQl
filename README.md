# `Simple Mongo Express React Node (MERN) web application`

Key features:

- Typescript on front-end and back-end == Type safety :relaxed:
- TS-node-dev for watching and respawning node server on changes
- Mongo + Express + React + Node TS (MERN)
- Mongoose for accessing mongodb

Current Disadvantages:
- Have to write lots of boilerplate for CRUD operations
- boilerplate for writing queries/mutations 

## `Future Roadmap`

frontend:

- [ ] React + Apollo (no Redux or fetch needed!!)
- [ ] Styled components
- [ ] NEXT.js for server side rendering
- [ ] Jest + enzyme

Backend:

- [x] TS-node-dev for automatic server restarts on code changes
- [x] Connected MongoDB database
- [x] Remove REST endpoints and MVC structure
- [x] GraphQl-Yoga (apollo + express + node server) for implementing resolvers,
queries and mutations
- [ ] GraphQl Code generator - used to auto create interfaces and schemas
- [ ] Prisma (GraphQl CRUD api = less boilerplate to write, Type safety, Data Layer
  Access, replaces TypeORM)
