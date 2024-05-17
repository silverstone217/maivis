import CategorySections from "@/components/home/CategorySections";
import Hero from "@/components/home/Hero";
import PopularServices from "@/components/home/PopularServices";
import { prisma } from "@/lib/prisma";
import { User } from "next-auth";

export const getServices = async () => {
  const services = await prisma.user.findMany({
    where: {
      jobber: {
        NOT: undefined,
      },
    },
    select: {
      id: true,
      name: true,
      image: true,
      email: true,
      createdAt: true,
      updatedAt: true,
      jobber: true,
      role: true,
      tel: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 8,
  });

  return services;
};

export default async function Home() {
  const services = (await getServices()) as unknown as User[];

  return (
    <main className="flex flex-col items-center justify-between p-3 lg:p-5">
      <div className="max-w-7xl mx-auto space-y-10 lg:space-y-16">
        <Hero />
        <div className=" space-y-4">
          <div className="mx-auto w-4/5 text-center text-2xl font-bold">
            <h2>Les categories populaires</h2>
          </div>
          <CategorySections />
        </div>

        {services.length > 0 && <PopularServices services={services} />}

        <p className="text-xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea dolorum
          consectetur nostrum nobis quasi in eaque? Ipsum explicabo repudiandae
          soluta, sit, totam ea magni officia iste quos sint excepturi itaque.
          Minima, quia? Accusamus ipsam incidunt quia, illum consequuntur, autem
          repellendus provident labore molestias dolorem nesciunt modi
          voluptate. Quia nobis maiores, eligendi aspernatur incidunt, porro
          magni facilis, velit voluptatem fugiat nulla. Voluptatibus hic, odio
          commodi mollitia dolore vitae labore, voluptates fugit velit nemo quis
          officiis, nostrum iure obcaecati qui unde quos adipisci est minima
          quidem quod? Incidunt laudantium ut ratione dolorem! Praesentium dicta
          illum ipsa reiciendis adipisci numquam dolores consectetur libero
          optio, autem cumque placeat natus aut vero maxime consequuntur
          asperiores est? Distinctio eligendi architecto eum ducimus hic placeat
          id commodi!
        </p>
      </div>
    </main>
  );
}
