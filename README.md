# My final training project at [BCH](https://www.bc.fi) with [Wunder](https://www.wunder.io) company as a partner

This is the final project of my developer training, which I completed in collaboration with two other students for our course partner, the [Wunder](https://www.wunder.io) company. The project represents our vision of the company’s website and uses Wunder’s brandbook and [Next-Drupal-starterkit](https://github.com/wunderio/next-drupal-starterkit), an innovation by Wunder's [Mario Verselotti](https://www.linkedin.com/in/mariovercellotti/), which is a starter template for developing sites that use Drupal CMS as a backend and Next.js for the frontend.

https://github.com/Pavel-Kliukin/Wunder-project/assets/98514950/2c22be53-a1bf-4b81-9214-5d8c972444a2

## 🏎️ Technologies used:
- Drupal
- Next.js
- TypeScript
- Tailwind css
- Zod validation
- Paragraphs module for Drupal


## 🛠 How to setup

All you need to do is run the setup script like this:

```bash
./setup.sh
```

The script will execute a series of commands in sequence. If an error occurs, you can run the script again, and it will pick up where it left off.

If the script has failed on some step, and instead of continuing you want to start from scratch, you can run the script with the `-c` flag:

```bash
./setup.sh -c
```

> NOTE: the script will install the site from scratch. To get it looks like on demo video the Data base should be imported with the command
```bash
lando db-import drupal10.2023-12-21-1703154995.sql.gz
```
Credentials for the Drupal admin panel:  
User name: admin  
User password: yqycSbXMDM  

### 📄 For more details about the setup read on the [Next-Drupal-starterkit](https://github.com/wunderio/next-drupal-starterkit).
