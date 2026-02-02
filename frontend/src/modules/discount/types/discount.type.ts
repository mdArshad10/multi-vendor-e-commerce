
import * as yup from "yup";

export const createDiscountCodeSchema = yup.object({
    discountCode: yup.string().trim().required(),
    discountType: yup.string().trim().required(),
    discountValue: yup.number().min(1, "Discount value is required").required(),
    public_name: yup.string().trim().required(),
});

export type createDiscountType = yup.InferType<typeof createDiscountCodeSchema>