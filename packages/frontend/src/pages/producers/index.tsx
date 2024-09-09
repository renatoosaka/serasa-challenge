import { useQuery } from "react-query";
import { getProducers } from "../../services/producers";
import { Loading } from "../../components/loading";
import { Title } from "../../components/title";

export function ProducersHome() {
  const { data, isLoading } = useQuery({
    queryKey: ["producers"],
    queryFn: async () => {
      return getProducers();
    },
  });

  return (
    <div>
      <Title text="Produtores" href="/producers/new" />
      {isLoading && <Loading />}
      {!isLoading && data?.length === 0 && (
        <div>Nenhuma informação encontrada</div>
      )}
      {!isLoading && data && data?.length > 0 && (
        <div className="container w-full max-w-screen-xl mx-auto">
          <div className="flex p-2 font-bold bg-gray-200 rounded">
            <div className="w-4/12">ID</div>
            <div className="w-8/12">Nome</div>
          </div>
          {data?.map((item) => (
            <a
              key={item.id}
              href={`/producers/${item.id}`}
              className="flex p-2 border-b hover:bg-gray-50"
            >
              <div className="w-4/12">{item.id}</div>
              <div className="w-8/12">{item.name}</div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
