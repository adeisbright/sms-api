import app from "../../app";
import chai from "chai";
import chaiHttp from "chai-http";
import { randPhoneNumber, randText } from "@ngneat/falso";

//import Config from "../../config"

chai.use(chaiHttp);
const expect = chai.expect;

describe("SMS API Request Handlers", () => {
	describe("POST /inbound/sms", () => {
		let rightCredentials = "";
		let wrongCredentials = "";

		beforeEach(() => {
			const correctAuth = "azr2:54P2EOKQ47";
			const wrongAuth = "azxy:54P2EOKQ47";
			rightCredentials = Buffer.from(correctAuth).toString("base64");
			wrongCredentials = Buffer.from(wrongAuth).toString("base64");
		});

		it("Should  reject the request because there is no authorization", async () => {
			const reqBody = {
				to: randPhoneNumber(),
				from: randPhoneNumber(),
				text: randText()
			};

			const response = await chai
				.request(app)
				.post("/inbound/sms")
				.send(reqBody);
			expect(response.body)
				.to.have.property("error")
				.eq("Authorization Header Missing");
		});

		it("Should  reject the request because the authorization is not basic", async () => {
			const reqBody = {
				to: randPhoneNumber(),
				from: randPhoneNumber(),
				text: randText()
			};

			const response = await chai
				.request(app)
				.post("/inbound/sms")
				.set({ authorization: `Bearer ` })
				.send(reqBody);

			expect(response.body)
				.to.have.property("error")
				.eq("Invalid Authorization. Basic Authorization required");
		});

		it("Should forbid the request", async () => {
			const reqBody = {
				to: randPhoneNumber(),
				from: randPhoneNumber(),
				text: randText()
			};

			const response = await chai
				.request(app)
				.post("/inbound/sms")
				.set({ authorization: `Basic ${wrongCredentials}` })
				.send(reqBody);

			expect(response.body).to.have.property("error").eq("Forbidden");
		});

		it("Should allow the request but send error about from field", async () => {
			const reqBody = {
				to: "0099",
				from: "90900",
				text: randText()
			};

			const response = await chai
				.request(app)
				.post("/inbound/sms")
				.set({ authorization: `Basic ${rightCredentials}` })
				.send(reqBody);

			expect(response.body)
				.to.have.property("error")
				.eq("from is invald");
		});

		it("Should send a message to the client", async () => {
			const reqBody = {
				text: "STOP and try againi",
				to: "13605895047",
				from: "441224459426"
			};

			const response = await chai
				.request(app)
				.post("/inbound/sms")
				.set({ authorization: `Basic ${rightCredentials}` })
				.send(reqBody);

			expect(response.body)
				.to.have.property("message")
				.eq("inbound sms ok");
		});
	});
});
