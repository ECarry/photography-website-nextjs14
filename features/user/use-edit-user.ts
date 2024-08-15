import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<(typeof client.api.user)["$patch"]>;

type RequestType = InferRequestType<(typeof client.api.user)["$patch"]>["json"];

export const useEditUser = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const res = await client.api.user["$patch"]({ json });

      return await res.json();
    },
    onSuccess: () => {
      toast.success("User updated successfully");
      queryClient.refetchQueries({ exact: true });
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  return mutation;
};
