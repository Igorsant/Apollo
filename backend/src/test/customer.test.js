import fetch from 'node-fetch';

test("GET CUSTOMER BY ID", async () => {
    let res = await fetch(
        "http://localhost:3001/customer/teste", 
        {
            method: "GET",
            body: {
                "message": "hello world!"
            }
        }
    )
    let body = await res.json()
    expect(body).toBe({
        "_original": {
            "customerId": "teste"
        },
        "details": [
            {
                "message": "\"customerId\" must be a number",
                "path": [
                    "customerId"
                ],
                "type": "number.base",
                "context": {
                    "label": "customerId",
                    "value": "teste",
                    "key": "customerId"
                }
            }
        ]
    });
});