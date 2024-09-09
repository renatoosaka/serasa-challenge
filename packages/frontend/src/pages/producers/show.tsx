import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Title } from "../../components/title";
import { getProducer, updateProducer } from "../../services/producers";
import { Loading } from "../../components/loading";
import { Controller, useForm } from "react-hook-form";
import { getPlatedCrops } from "../../services/planted-crops";
import { UpdateProducerFormData } from "../../types/producer";
import { FormInputText } from "../../components/form-input-text";
import { FormRow } from "../../components/form-row";

export function ProducersShow() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["producers", id],
    queryFn: () => {
      return getProducer(id as string);
    },
  });
  const { data: plantedCrops } = useQuery({
    queryKey: ["planted-crops"],
    queryFn: () => {
      return getPlatedCrops();
    },
  });
  const { mutateAsync, isLoading: isMutating } = useMutation({
    mutationKey: ["producers", id],
    mutationFn: (data: UpdateProducerFormData) => {
      return updateProducer(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["producers"]);
      queryClient.invalidateQueries(["producers", id]);
      navigate("/producers");
    },
  });
  const { register, control, handleSubmit, reset, watch, setValue } =
    useForm<UpdateProducerFormData>({});

  useEffect(() => {
    if (data) {
      reset({
        ...data,
        planted_crops: data?.planted_crops.map((item) => item.id) || [],
      });
    }
  }, [data, reset]);

  const handleCheckboxChange = (id: string) => {
    const currentPlantedCrops = watch("planted_crops") || [];
    if (currentPlantedCrops.includes(id)) {
      setValue(
        "planted_crops",
        currentPlantedCrops.filter((cropId) => cropId !== id)
      );
    } else {
      setValue("planted_crops", [...currentPlantedCrops, id]);
    }
  };

  const onSubmit = async (data: UpdateProducerFormData) => {
    try {
      if (isMutating) return;

      await mutateAsync(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Title text="Produtores" />
      {isLoading && <Loading />}
      {!isLoading && data && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormRow>
            <FormInputText
              label="Nome"
              {...register("name", { required: true })}
            />
          </FormRow>
          <FormRow>
            <FormInputText
              label="Document"
              {...register("document", { required: true })}
            />
          </FormRow>
          <FormRow>
            <FormInputText
              label="Fazenda"
              {...register("farm", { required: true })}
            />
          </FormRow>
          <FormRow>
            <FormInputText
              label="Cidade"
              {...register("city", { required: true })}
            />
          </FormRow>
          <FormRow>
            <FormInputText
              label="Estado"
              {...register("state", { required: true })}
            />
          </FormRow>
          <FormRow>
            <FormInputText
              label="Área"
              {...register("area", { required: true })}
              type="number"
            />
          </FormRow>
          <FormRow>
            <FormInputText
              label="Área Agricultável"
              {...register("farmable_area", { required: true })}
              type="number"
            />
          </FormRow>
          <FormRow>
            <FormInputText
              label="Área de Vegetação"
              {...register("vegetation_area", { required: true })}
              type="number"
            />
          </FormRow>
          <div className="flex flex-col gap-2 p-2 mb-4 border border-gray-300 rounded">
            <p>Culturas plantadas</p>
            <div className="grid grid-cols-4">
              {plantedCrops?.map((item) => (
                <div key={item.id}>
                  <label className="flex items-center gap-2">
                    <Controller
                      name="planted_crops"
                      control={control}
                      render={() => (
                        <input
                          type="checkbox"
                          checked={
                            watch("planted_crops")?.includes(item.id) || false
                          }
                          value={item.id}
                          onChange={() => handleCheckboxChange(item.id)}
                          className="w-4 h-4 rounded"
                        />
                      )}
                    />
                    {item.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-end w-full gap-2">
            <a href="/producers" className="px-4 py-2 hover:text-blue-500">
              Cancelar
            </a>
            <button
              type="submit"
              disabled={isMutating}
              className="px-4 py-2 font-semibold transition-colors bg-green-600 rounded text-green-50 hover:bg-green-700"
            >
              Salvar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
