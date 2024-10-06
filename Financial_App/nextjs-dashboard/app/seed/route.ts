 import bcrypt from 'bcrypt';
 import { db } from '@vercel/postgres';
 import { invoices, customers, revenue, users } from '../lib/placeholder-data';

 const client = await db.connect();

 async function seedusers() {
   await client.sql`create extension if not exists "uuid-ossp"`;
   await client.sql`
     create table if not exists users (
       id uuid default uuid_generate_v4() primary key,
       name varchar(255) not null,
       email text not null unique,
       password text not null
     );
   `;

   const insertedusers = await Promise.all(
     users.map(async (user) => {
       const hashedpassword = await bcrypt.hash(user.password, 10);
       return client.sql`
         insert into users (id, name, email, password)
         values (${user.id}, ${user.name}, ${user.email}, ${hashedpassword})
         on conflict (id) do nothing;
       `;
     }),
   );

   return insertedusers;
 }

 async function seedinvoices() {
   await client.sql`create extension if not exists "uuid-ossp"`;

   await client.sql`
     create table if not exists invoices (
       id uuid default uuid_generate_v4() primary key,
       customer_id uuid not null,
       amount int not null,
       status varchar(255) not null,
       date date not null
     );
   `;

   const insertedinvoices = await Promise.all(
     invoices.map(
       (invoice) => client.sql`
         insert into invoices (customer_id, amount, status, date)
         values (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
         on conflict (id) do nothing;
       `,
     ),
   );

   return insertedinvoices;
 }

 async function seedcustomers() {
   await client.sql`create extension if not exists "uuid-ossp"`;

   await client.sql`
     create table if not exists customers (
       id uuid default uuid_generate_v4() primary key,
       name varchar(255) not null,
       email varchar(255) not null,
       image_url varchar(255) not null
     );
   `;

   const insertedcustomers = await Promise.all(
     customers.map(
       (customer) => client.sql`
         insert into customers (id, name, email, image_url)
         values (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
         on conflict (id) do nothing;
       `,
     ),
   );

   return insertedcustomers;
 }

 async function seedrevenue() {
   await client.sql`
     create table if not exists revenue (
       month varchar(4) not null unique,
       revenue int not null
     );
   `;

   const insertedrevenue = await Promise.all(
     revenue.map(
       (rev) => client.sql`
         insert into revenue (month, revenue)
         values (${rev.month}, ${rev.revenue})
         on conflict (month) do nothing;
       `,
     ),
   );

   return insertedrevenue;
 }

export async function GET() {
    /*
    return Response.json({
    message:
      'uncomment this file and remove this line. you can delete this file when you are finished.',
  }); */
   try {
     await client.sql`begin`;
     await seedusers();
     await seedcustomers();
     await seedinvoices();
     await seedrevenue();
     await client.sql`commit`;

     return Response.json({ message: 'database seeded successfully' });
   } catch (error) {
     await client.sql`rollback`;
     return Response.json({ error }, { status: 500 });
   }
}
