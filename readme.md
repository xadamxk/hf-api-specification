# HF API OpenAPI Definition

## Working on your OpenAPI Definition

### Install

1. Install [Node JS](https://nodejs.org/).
2. Clone this repo and run `npm install` in the repo root.

### Usage

#### `npm start`
Starts the swagger ui preview server.

#### `npm run build`
Bundles the definition to the dist folder.

#### `npm test`
Validates the definition.


### Documentation Progress
✔️ Documented (Request schema, examples, and response)

⚠️ Partially Documented

❌ Undocumented

<details>
<summary>Read</summary>

✔️ me

✔️ forums

✔️ threads

✔️ posts

✔️ users

✔️ bytes

✔️ contracts

✔️ disputes

✔️ bratings

⚠️ sigmarket
</details>

<details>
<summary>Write</summary>

✔️ posts

✔️ threads

✔️ bytes

✔️ bytes (deposit)

✔️ bytes (withdraw)

✔️ bytes (dump)

❌ contracts

❌ contracts (undo)

❌ contracts (deny)

❌ contracts (approve)

❌ contracts (deny middleman)

❌ contracts (approve middleman)

❌ contracts (cancel vendor contract)

❌ contracts (request cancellation)

❌ contracts (mark complete)

❌ sigmarket (purchase)

❌ sigmarket (sell)

❌ sigmarket (remove signature from signature market)

❌ sigmarket (update purchased signature)
</details>

### Schemas

#### Adding Schemas

1. Navigate to the `openapi/components/schemas` folder.
2. Add a file named as you wish to name the schema.
3. Define the schema.
4. Refer to the schema using the `$ref` (see example below).

##### Example Paths & Components
A simple path example can be found below.
Notice it includes a summary, description, request body, an example, and a sample response.
```yaml
post:
  tags:
    - me
  summary: Returns information for the current user.
  description: Returns information for the current user.
  requestBody:
    required: true
    content:
      application/json:
        examples:
          usernameUsergroup:
            summary: return current user's uid, username, and usergroup
            value:
              asks:
                me:
                  uid: true
                  username: true
                  usergroup: true
        schema:
          $ref: ..\components\schemas\me\MeReadRequestAsk.yaml
  responses:
    "200":
      description: Me info
      headers:
        x-rate-limit-remaining:
          schema:
            type: integer
            description: Request limit per hour.
      content:
        application/json:
          schema:
            $ref: '..\components\schemas\me\MeReadResponse.yaml'
    "401":
      $ref: ..\components\responses\UnauthorizedError.yaml
```

##### Using the `$ref`

Notice in the path example above the schema definition itself has `$ref` links to other schemas defined.

Here is a small excerpt with an example:

```yaml
content:
  application/json:
    schema:
      $ref: '..\components\schemas\me\MeReadResponse.yaml'
```

The value of the `$ref` is the path to the response schema definition.
You may use `$ref`s to compose schema from other existing schema to avoid duplication.
You will use `$ref`s to reference schema from your path definitions.


#### Adding a Path

1. Navigate to the `openapi/paths` folder.
2. Add a new YAML file named like your URL endpoint except replacing `/` with `@` and putting path parameters into curly braces like `{example}`.
3. Add the path and a ref to it inside of your `openapi.yaml` file inside of the `openapi` folder.

Example addition to the `openapi.yaml` file:
```yaml
'/customers/{id}':
  $ref: './paths/customers@{id}.yaml'
```