# Angular-Blog
A simple blog in Angular, with a pocketbase backend.  
Monorepo  

Angular config:  
Style chosen : CSS  
SSR/SSG: No  

### Features

- Backend (bonus)
  - Made with pocketbase.
  - Setup collections correctly.
    - `users`, `blogs` and `articles`.
    - `blogs` is linked to `users` by `ownerId`
    - `articles` is linked to `users` by `authorId` and to `blogs` by `blogId`.
- Frontend
  - Style : TailwindCSS
  - Authentication
    - Registering a user (bonus)
    - Logging in
    - Logging out
  - Blogs
    - Blogs page with pagination
    - Creating blogs
    - Editing blogs if you are the owner
    - Deleting blogs if you are the owner
  - Articles
    - Articles page with pagination
    - Creating articles
    - Editing articles if you are the author
    - Deleting articles if you are the author

Everyone can see every blog and article, but only the owners and authors can modify or delete them.


### Launching the backend

Execute the following commands:
```
you@pc:~/Angular-Blog$
> cd app-back

you@pc:~/Angular-Blog$
> pocketbase serve
```


### Launching the frontend

Execute the following commands:
```
you@pc:~/Angular-Blog$
> cd app-front

you@pc:~/Angular-Blog$
> ng serve
```
