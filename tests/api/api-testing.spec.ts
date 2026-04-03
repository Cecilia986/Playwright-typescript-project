
import { test, expect, request } from '@playwright/test';

// Use the public API to practice
// Recommended for use: https://jsonplaceholder.typicode.com (free、stable、No Auth)

const BASE_URL = 'https://jsonplaceholder.typicode.com';

test.describe('API test-base',{tag: '@API' }, () =>{
    // ============================================
  // 1. GET request - get data
  // ============================================
    test.describe('Get request', () =>{
        test('1.1 Get all posts', async ({request}) =>{
            const response = await request.get(`${BASE_URL}/posts`);

            // Verify the status codes
            expect(response.status()).toBe(200);

            //Obtain response body
            const posts = await response.json();

            //Verify data structure
            expect(Array.isArray(posts)).toBeTruthy();
            expect(posts.length).toBeGreaterThan(0);
            
            //Verify data structure of the first post
            const firstpost = posts[0];
            expect(firstpost).toHaveProperty('id');
            expect(firstpost).toHaveProperty('userId');
            expect(firstpost).toHaveProperty('title');
            expect(firstpost).toHaveProperty('body');
            
            console.log(`Obtained ${posts.length} posts`);
        });

        test('1.2 Get a single post', async({request}) =>{
            const response =await request.get(`${BASE_URL}/posts/1`);

            expect(response.status()).toBe(200);

            const post = await response.json();
            expect(post.id).toBe(1);
            expect(post.userId).toBe(1);
            expect(post.title).toBeTruthy();

            console.log(`User id: ${post.userId}`);
            console.log(`Title: ${post.title}`);
        });

        test(`1.3 Obtaining non-exist resource-404`, async ({ request }) =>{
            const response = await request.get(`${BASE_URL}/posts/99999`);

            expect(response.status()).toBe(404);
            console.log('404 ')
        });

        test('1.4 Get Request with query parameters', async ({ request }) =>{
            const response = await request.get(`${BASE_URL}/posts`, {
                params:{
                    userId: 1
                }
            });

            expect(response.status()).toBe(200);

            const posts =await response.json();

            // Verify that all returned posts belong to userId=1
            posts.forEach(( post: any) =>{
                expect(post.userId).toBe(1);
            });

            console.log(`${posts.length} posts belong to userId=1`);
        });

        test('1.5 Get comments', async ({ request }) =>{
            const response = await request.get(`${BASE_URL}/posts/1/comments`);

            expect(response.status()).toBe(200);

            const comments = await response.json();
            expect(Array.isArray(comments)).toBeTruthy();
            expect(comments.length).toBeGreaterThan(0);

            //Verify structure
            const firstComment = comments[0];
            expect(firstComment).toHaveProperty('name');
            expect(firstComment).toHaveProperty('email');
            expect(firstComment).toHaveProperty('postId');
            expect(firstComment).toHaveProperty('body');

            console.log(`The post has ${comments.length} posts`);
        });
    });

    // ============================================
   // 2. POST 请求 - 创建数据
  // ============================================
    test.describe('POST Request', () =>{
        test('2.1 Create a new post', async ({request}) =>{
            const newPost ={
                title: 'Playwright API test',
                body: 'This is a API test case by Playwright',
                userId: 1
            };

            const response =await request.post(`${BASE_URL}/posts`, {
                data: newPost
            });

            expect(response.status()).toBe(201);
            const createPost = await response.json();

            //Verify the returned data contains content that I sent
            expect(createPost.title).toBe(newPost.title);
            expect(createPost.body).toBe(newPost.body);
            expect(createPost.userId).toBe(newPost.userId);
            expect(createPost).toHaveProperty('id');

            console.log('New post is created successfully, ID: ${createdPost.id}');
        });

        test('2.2 Create new post and verify response', async({ request }) =>{
            const response = await request.post(`${BASE_URL}/posts`, {
                data:{
                    title: 'test title',
                    body: 'test content',
                    userId:1
                }
            });

            expect(response.status()).toBe(201);

            //Check response
            const contentType = response.headers()['content-type'];
            expect(contentType).toContain('application/json');

            console.log('Response header verification passed!');

        });
   });

    // ============================================
  // 3. PUT 请求 - 更新数据
  // ============================================
    test.describe('PUT request', () =>{
        test('3.1 Update a post', async ({ request }) =>{
            const updatePost ={
                id: 1,
                title: 'This is a updated title',
                body: 'This is the updated body',
                userId: 1 
            };
            const response = await request.put(`${BASE_URL}/posts/1`,{
                data: updatePost
            });

            expect(response.status()).toBe(200);
            const result =await response.json();
            expect(result.title).toBe(updatePost.title);
            expect(result.body).toBe(updatePost.body);

            console.log('The post has been updated');
        });
    });

    // ============================================
   // 4. PATCH Request - Partial update
   // ============================================
    test.describe('PATCH Request', () =>{
        test('4.1 Partially update posts', async ({ request }) =>{
            const response = await request.patch(`${BASE_URL}/posts/1`, {
                data:{
                    title: 'Just only update the title' 
                }
            });
            expect(response.status()).toBe(200);

            const result = await response.json();
            expect(result.title).toBe('Just only update the title');
            expect(result.body).toBeTruthy();

            console.log('Partial updated successfully');
        });
    });

    // ============================================
    // 5. DELETE Reques -Delete data
    // ============================================
    test.describe('DELETE Request', () =>{
        test('5.1 Delete a post', async ({request}) =>{
            const response = await request.delete(`${BASE_URL}/posts/1`);

            expect(response.status()).toBe(200);
            console.log('Delete successfully');
        })
    });
});


