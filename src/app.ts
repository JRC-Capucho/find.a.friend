import fastify from "fastify";
import cookie from "@fastify/cookie";
import { fastifyJwt } from "@fastify/jwt";

const app = fastify();

app.register(cookie);
app.register(fastifyJwt);

export { app };
