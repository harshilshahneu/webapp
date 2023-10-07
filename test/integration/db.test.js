import { getConnection } from "../../api/services/healthz-service";

describe("Database connection", () => {
    test('should check the connection', async () => { 
        const connection = await getConnection();
        expect(connection.status).toBe(201);
     })
});