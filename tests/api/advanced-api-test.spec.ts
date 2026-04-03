// ============================================
// 6. Advanced API test
// ============================================
import { test, expect } from '@playwright/test';

const BASE_URL = 'https://restful-booker.herokuapp.com';

test.describe('Chain call test',{ tag: '@API'}, () => {
  
  let authToken: string;
  let bookingId: number;

  // ==================== 1. Get auth Token first====================
  test('Step 1: Get auth Token', async ({ request }) => {
        const authResponse = await request.post(`${BASE_URL}/auth`, {
        data: {
            username: 'admin',
            password: 'password123'
        }
        });
        
        expect(authResponse.status()).toBe(200);
        const authBody = await authResponse.json();
        authToken = authBody.token;
        console.log(`Got the Token: ${authToken}`);
        expect(authToken).toBeDefined();
  });

  // ==================== 2. Create new Booking ====================
  test('Step 2: Create new Booking', async ({ request }) => {
        const createResponse = await request.post(`${BASE_URL}/booking`, {
        data: {
            firstname: 'John',
            lastname: 'Doe',
            totalprice: 150,
            depositpaid: true,
            bookingdates: {
            checkin: '2025-04-01',
            checkout: '2025-04-05'
            },
            additionalneeds: 'Breakfast'
        }
        });
        
        expect(createResponse.status()).toBe(200);
        const createBody = await createResponse.json();
        bookingId = createBody.bookingid;
        console.log(`Created successufuly，Booking ID: ${bookingId}`);
        expect(bookingId).toBeGreaterThan(10); 
   });

  // ==================== 3. Get the newly created Booking ====================
  test('Step3: Get the newly created Booking', async ({ request }) => {
        // Ensure the previous test has been executed
        expect(bookingId).toBeDefined();
        
        const getResponse = await request.get(`${BASE_URL}/booking/${bookingId}`);
        expect(getResponse.status()).toBe(200);
        
        const booking = await getResponse.json();
        console.log(`Get successfully: ${booking.firstname} ${booking.lastname}`);
        
        expect(booking).toMatchObject({
        firstname: 'John',
        lastname: 'Doe',
        totalprice: 150,
        depositpaid: true
        });
  });

  // ==================== 4. 更新 Booking (需要 Token) ====================
  test('Step 4: update Booking', async ({ request }) => {
        expect(bookingId).toBeDefined();
        expect(authToken).toBeDefined();
        
        const updateResponse = await request.put(`${BASE_URL}/booking/${bookingId}`, {
        headers: {
            'Cookie': `token=${authToken}`,
            'Content-Type': 'application/json'
        },
        data: {
            firstname: 'Jane',
            lastname: 'Smith',
            totalprice: 200,
            depositpaid: false,
            bookingdates: {
            checkin: '2025-05-01',
            checkout: '2025-05-10'
            },
            additionalneeds: 'Dinner'
        }
        });
        
        expect(updateResponse.status()).toBe(200);
        const updatedBooking = await updateResponse.json();
        console.log(`Update successfully: ${updatedBooking.firstname} ${updatedBooking.lastname}`);
        
        expect(updatedBooking).toMatchObject({
        firstname: 'Jane',
        lastname: 'Smith',
        totalprice: 200
        });
    });

  // ==================== 5. partail update Booking (PATCH) ====================
  test('Step 5: partail update Booking', async ({ request }) => {
        expect(bookingId).toBeDefined();
        expect(authToken).toBeDefined();
        
        const patchResponse = await request.patch(`${BASE_URL}/booking/${bookingId}`, {
            headers: {
                'Cookie': `token=${authToken}`,
                'Content-Type': 'application/json'
            },
            data: {
                totalprice: 250,
                additionalneeds: 'Breakfast & Dinner'
            }
        });
    
        expect(patchResponse.status()).toBe(200);
        const patchedBooking = await patchResponse.json();
        console.log(`Some updates were successful: totalprice = ${patchedBooking.totalprice}`);
        
        expect(patchedBooking.totalprice).toBe(250);
        expect(patchedBooking.additionalneeds).toBe('Breakfast & Dinner');
        // Other fields remain unchanged
        expect(patchedBooking.firstname).toBe('Jane');
  });

  // ==================== 6. 删除 Booking ====================
  test('Step 6: delete Booking', async ({ request }) => {
        expect(bookingId).toBeDefined();
        expect(authToken).toBeDefined();
        
        const deleteResponse = await request.delete(`${BASE_URL}/booking/${bookingId}`, {
            headers: {
                'Cookie': `token=${authToken}`
            }
            });
            
            expect(deleteResponse.status()).toBe(201);
            console.log(`✓ 删除成功，Booking ID: ${bookingId}`);
    });

  // ==================== 7. Verify that it can't obtain after delete ====================
  test('step7: Cannot be obtained after delete', async ({ request }) => {
        expect(bookingId).toBeDefined();
        
        const getResponse = await request.get(`${BASE_URL}/booking/${bookingId}`);
        // it shoube return 404 Not Found after delete
        expect(getResponse.status()).toBe(404);
        console.log(`✓ Verification successful: Booking ${bookingId} 已不存在`);
    });

  // ======================================//
  // ======================================//
  test('6.2 Verify response schema', async ({ request }) =>{
         const response = await request.get(`${BASE_URL}/booking/1`,{
            headers:{
                'Accept': 'application/json'
            }
        });
         expect(response.status()).toBe(200);
         const booking = await response.json();
         console.log('Booking data:', booking);

         //Verify that data exists and its structure is correct
        expect(booking).toHaveProperty('firstname');
        expect(booking).toHaveProperty('lastname');
        expect(booking).toHaveProperty('totalprice');
        expect(booking).toHaveProperty('depositpaid');
        expect(booking).toHaveProperty('bookingdates');

         //Verify the required fields exist and their type are correct
         expect(typeof booking.firstname).toBe('string');
         expect(typeof  booking.lastname).toBe('string');
         expect(typeof  booking.totalprice).toBe('number');
         expect(typeof  booking.depositpaid).toBe('boolean');

         console.log('Pass');
    });

    test('6.3 Use the environment variables', async({ request }) =>{
        //Use the environment variables in a real project
        const apiURL = process.env.API_URL || BASE_URL;
        const response = await request.get(`${apiURL}/booking/1`,{
            headers:{
                'Accept': 'application/json'
            }
        });

        expect(response.status()).toBe(200);
        console.log(`Use environemnt variables: ${apiURL}`);
    })

});

