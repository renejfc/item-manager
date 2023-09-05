# 🛠️ Project Setup

_**In order to get the app running with the expected behaviour you'll need these:**_

## 🟢 Node 18.17.1 *(LTS)*
You can use the node binary from the official package or a node package manager (such as [NVM](https://github.com/nvm-sh/nvm), [FNM](https://github.com/Schniz/fnm), [N](https://github.com/tj/n))

## 🐱 PNPM

With Node LTS Installed, you can enable corepack...

```shell
corepack enable
```

...then install the dependencies

```shell
pnpm install
```

---
## ⚡ Development Server

You can start the dev server by using...

```shell
pnpm dev
```
---

## 📈 Build

You can use this to build into the production version of the app...

```shell
pnpm build
```
...also you can run the build with

```shell
pnpm start
```

---

# 🧠 Proccess

- First thing I wanted to approach here was using tailwind for rapid prototyping, and I think it was the best decision because there were a lot of challenges and bugs I had to focus on, by using tailwind I had to think less about the css architecture and more on the rest of the app while mantaining a "neat" UI.

- Another thing I had to think a lot about was the UI and the UX, I wanted to make it as simple as possible, but also I wanted to make it look and feel good, so I ended up thinking about this "search bar" concept where we could access (almost) to everything from there.


- And one last thing that kept me thinking the most of the time was the pagination method, because from my perspective it only made sense if we could get pagination directly from the api so we could avoid fetching all the data at once.

- In general I had quite a few doubts and questions along the way, which were a bit harder to clarify since I was working alone, so most of the decisions and solutions are somehow just arbitrary. There's a lot of room for improvement to handle edge cases, and build a more efficient solution.
---

# 🏗️ Architecture
- Since the api didn't provide the pagination feature, I had to think about a way to implement it (mock it) in the server. I ended up mocking what the api should provide as a server action and for the UI I used a "virtual scroll" method, where we only fetch the data that is being displayed on the screen, and we fetch more data as we scroll down.

- One key decision was to use the `URLSearchParams` api to handle the query params, I think it's a very useful api and it's simple use, also it's supported by all the major browsers.

- For UI controls and other states I decided to use Zustand as state manager for it's simplicity and performance.

- Folder Structure:
  - `actions`: Here we have the mock of the pagination system as a next server action. Basically we do everything needed in order to get an optimal pagination including filtering and sorting which I consider neccesary for a good one. In case the API started providing the pagination, the only thing we would have to do is to remove the mock and use the API instead.
  - `app`: The app folder from next, now "standard" and recommended. We build the pages and routes here along layouts and other "system" components such as error handlers, 404 handlers, etc.
  - `components`: On the top level we have the "bussiness logic" components.
    - `ui`: Here we have the "primitives" components, the ones that are used to build the "bussiness logic" components and can be used anywhere else in the app by themselves.
  - `lib`: Here we have utility functions, hooks, stores, and other stuff that can be used anywhere in the app.
  - `types`: Centralized types to share across the app.
---
# 📝 Next Steps
- I would focus on the edge cases and bugs that I couldn't cover in the time I had, maybe re-thinking the strategy to handle the search and how I work around the URLSearchParams api, I think there's a lot of room for improvement there, and maybe also trying to work more with the server.

- Test are really important and I would like to have a good coverage of e2e and unit tests. My options would be Playwright for e2e and component testing due to being able to test in different browsers and mobile. And for unit testing I would use Vitest for its simplicity and huge performance & speed compared to other alternatives.

- Collaborate with others and hear feedback so I can have other perspective on how to approach the problems and solutions.
---
# 💭 Final Thoughts

Overall it was challenging and I got stuck a few times, but I think I managed to get a good result. I still have to cover a few edge cases and bugs but I think it's a good start for little time of planning.
