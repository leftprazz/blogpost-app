# Blogpost App

This repository contains a project named **blogpost-app** that consists of two services running in Docker containers: `blogpost_app` and `couchserver`. Before running the Docker Compose, users need to build the project image, tag it as desired, and then adjust the image name and tag in the Docker Compose file.

## Docker Compose Setup

1. **Build the Docker Image:**

   Before running the Docker Compose, build the Docker image for the project. Open a terminal in the project directory and run:

   ```bash
   docker build -t your_image_name:your_tag .
   ```

2. **Adjust Docker Compose:**

   Open the `docker-compose.yml` file and update the `image` field for the `blogpost_app` service with the name and tag you used during the image build.

   ```yaml
   services:
     blogpost_app:
       image: your_image_name:your_tag
       ports:
         - "4000:4000"
   
     couchserver:
       image: couchdb
       ports:
         - "5984:5984"
       environment:
         - COUCHDB_USER=admin
         - COUCHDB_PASSWORD=password
       volumes:
           - ./dbdata:/opt/couchdb/data
   ```

3. **Run Docker Compose:**

   To start the services using Docker Compose, use the following command:

   ```bash
   docker-compose up
   ```

   Alternatively, for Docker Swarm deployment:

   ```bash
   docker stack deploy -c docker-compose.yml your_app_name
   ```

## Aptible Deployment

To deploy the project on Aptible, follow these steps:

1. **Login to Aptible:**

   ```bash
   aptible login
   ```

2. **Deploy to Aptible:**

   ```bash
   aptible deploy --app your_app_name --docker-image your_image_name:your_tag --environment your_environment_name
   ```

   Replace `your_app_name`, `your_image_name:your_tag`, and `your_environment_name` with your specific app name, Docker image details, and environment name.

Now, your **blogpost-app** is deployed and running. Access the application at [http://your_aptible_app_url](http://your_aptible_app_url).

## Blogpost App API Endpoints

This section provides details on the API endpoints exposed by the **blogpost-app**.

### a. Create a New Blog Post

**Endpoint:** POST /posts

**Description:** Creates a new blog post.

**Request Body:**

```json
{
  "title": "String",
  "description": "String",
  "author": "String"
}
```

**Example:**

```http
POST http://localhost:4000/posts
{
  "title": "Sample Title",
  "description": "Sample Description",
  "author": "Pras"
}
```

### b. Get All Blog Posts

**Endpoint:** GET /posts

**Description:** Retrieves all blog posts.

**Response:**

```json
[
  {
    "id": "String",
    "key": "String",
    "value": {
      "rev": "String"
    },
    "doc": {
      "_id": "String",
      "_rev": "String",
      "title": "String",
      "description": "String",
      "author": "String",
      "createdAt": "Date",
      "updatedAt": "Date"
    }
  }
]
```

**Example:**

```http
GET http://localhost:4000/posts
```

### c. Get a Specific Blog Post

**Endpoint:** GET /posts/:id

**Description:** Retrieves a specific blog post by its ID.

**Parameters:**

- id: ID of the blog post.

**Response:**

```json
{
  "_id": "String",
  "_rev": "String",
  "title": "String",
  "description": "String",
  "author": "String",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

**Example:**

```http
GET http://localhost:4000/posts/your-post-id
```

### d. Update a Blog Post

**Endpoint:** PUT /posts/:id

**Description:** Updates a specific blog post by its ID.

**Parameters:**

- id: ID of the blog post.

**Request Body:**

```json
{
  "title": "String",
  "description": "String"
}
```

**Example:**

```http
PUT http://localhost:4000/posts/your-post-id
{
  "title": "Updated Title",
  "description": "Updated Description"
}
```

### e. Delete a Blog Post

**Endpoint:** DELETE /posts/:id

**Description:** Deletes a specific blog post by its ID.

**Parameters:**

- id: ID of the blog post.

**Example:**

```http
DELETE http://localhost:4000/posts/your-post-id
```

Please replace "your-post-id" with the actual ID of the blog post when testing the GET, PUT, and DELETE requests.