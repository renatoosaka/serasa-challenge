import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { Title } from "../../components/title";
import { getPlatedCrops } from "../../services/planted-crops";
import { Controller, useForm } from "react-hook-form";
import { Loading } from "../../components/loading";
import { FormRow } from "../../components/form-row";
import { FormInputText } from "../../components/form-input-text";
import { ProducerFormData } from "../../types/producer";
import { setProducer } from "../../services/producers";
import { STATES } from "../../utils/states";
import { FormInputSelect } from "../../components/form-input-select";

export function ProducersNew() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data: plantedCrops, isLoading } = useQuery({
    queryKey: ["planted-crops"],
    queryFn: () => {
      return getPlatedCrops();
    },
  });
  const { mutateAsync, isLoading: isMutating } = useMutation({
    mutationKey: ["producers"],
    mutationFn: (data: ProducerFormData) => {
      return setProducer(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["producers"]);
      navigate("/producers");
    },
  });
  const { register, control, handleSubmit, watch, setValue } =
    useForm<ProducerFormData>({});

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

  const onSubmit = async (data: ProducerFormData) => {
    try {
      if (isMutating) return;

      await mutateAsync({
        ...data,
        document: data.document.replace(/\D/g, ""),
        area: Number(data.area),
        farmable_area: Number(data.farmable_area),
        vegetation_area: Number(data.vegetation_area),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Title text="Novo Produtor" />
      {isLoading && <Loading />}

      {!isLoading && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormRow>
            <FormInputText
              label="Nome"
              {...register("name", { required: true, minLength: 3 })}
            />
          </FormRow>
          <FormRow>
            <FormInputText
              label="Documento (CPF/CNPJ)"
              {...register("document", {
                required: true,
                minLength: 11,
                maxLength: 14,
              })}
            />
          </FormRow>
          <FormRow>
            <FormInputText
              label="Fazenda"
              {...register("farm", { required: true, minLength: 3 })}
            />
          </FormRow>
          <FormRow>
            <FormInputText
              label="Cidade"
              {...register("city", { required: true, minLength: 3 })}
            />
          </FormRow>
          <FormRow>
            <FormInputSelect
              label="Estado"
              {...register("state", { required: true })}
            >
              {STATES.map((state) => (
                <option value={state.id} key={state.id}>
                  {state.label}
                </option>
              ))}
            </FormInputSelect>
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
