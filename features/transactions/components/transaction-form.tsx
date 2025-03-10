import { z } from "zod";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { AmountInput } from "@/components/amount-input";
import { DatePicker } from "@/components/date-picker";
import { insertTransactionSchema } from "@/db/schema";
import { Select } from "@/components/select";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { convertAmountToMiliunits } from "@/lib/utils";

const formSchema = z.object ({
    date: z.coerce.date(),
    accountId: z.string(),
    categoryId: z.string().nullable().optional(),
    payee: z.string(),
    amount: z.string(),
    notes: z.string().nullable().optional(),
});

const apiSchema = insertTransactionSchema.omit({
    id: true,
})

type FormValues = z.input<typeof formSchema>;
type ApiFormValues = z.input<typeof apiSchema>;

type Props = {
    id?: string;
    defaultValues?: FormValues;
    onSubmit: (values: ApiFormValues) => void;
    onDelete?: () => void;
    disabled?: boolean;
    accountOptions: { label: string; value: string }[];
    categoryOptions: { label: string; value: string }[];
    onCreateAccount: (name: string) => void;
    onCreateCategory: (name: string) => void;
};

export const TransactionForm = ({
    id,
    defaultValues,
    onSubmit,
    onDelete,
    disabled,
    accountOptions,
    categoryOptions,
    onCreateAccount,
    onCreateCategory,
}: Props) => {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            ...defaultValues, 
            payee: defaultValues?.payee ?? "",  // Ensuring  payee is always a string otherwise it will be intially shown as undefined
            date: defaultValues?.date ?? new Date(),
        },
    });
    

    const handleSubmit = (values: FormValues) => {
        const amount = parseFloat(values.amount);
        const amountInMiliunits = convertAmountToMiliunits(amount);
        onSubmit({
            ...values,
            amount: amountInMiliunits,
        });
    }

    const handleDelete = () => {
        onDelete?.();
    }

    return (
        <Form {...form}>
            <form 
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4 pt-4"
            >
                <FormField 
                name="date"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <DatePicker 
                            value={field.value}
                            onChange={field.onChange}
                            disabled={disabled}
                            />
                        </FormControl>
                    </FormItem>
                )}
                />
                <FormField 
                name="accountId"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            Account
                        </FormLabel>
                        <FormControl>
                            <Select 
                            options = {accountOptions}
                            placeholder="Select an account"
                            onCreate = {onCreateAccount}
                            value={field.value}
                            onChange={field.onChange}
                            disabled={disabled}
                            />
                        </FormControl>
                    </FormItem>
                )}
                />
                <FormField 
                name="categoryId"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            Category
                        </FormLabel>
                        <FormControl>
                            <Select 
                            options = {categoryOptions}
                            placeholder="Select an category"
                            onCreate = {onCreateCategory}
                            value={field.value}
                            onChange={field.onChange}
                            disabled={disabled}

                            />
                        </FormControl>
                    </FormItem>
                )}
                />
                <FormField 
                name="payee"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            Payee Name
                        </FormLabel>
                        <FormControl>
                            <Input 
                            disabled={disabled}
                            placeholder="Add Payee name"
                            {...field}
                            />
                        </FormControl>
                    </FormItem>
                )}
                />
                <FormField 
                name="amount"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            Amount (INR)
                        </FormLabel>
                        <FormControl>
                            <AmountInput 
                            {...field}
                            disabled={disabled}
                            placeholder="e.g. ₹100"
                            />
                        </FormControl>
                    </FormItem>
                )}
                />
                <FormField 
                name="notes"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            Notes
                        </FormLabel>
                        <FormControl>
                            <Textarea 
                            {...field}
                            value={field.value ?? ""}
                            disabled={disabled}
                            placeholder="Notes...(optional)"
                            />
                        </FormControl>
                    </FormItem>
                )}
                />
                <Button className="w-full" disabled = {disabled}>
                    {id? "Save Changes" : "Create transaction"}
                </Button>
                {!!id && <Button
                    type="button"
                    disabled={disabled}
                    onClick = {handleDelete}
                    className="w-full"
                    variant="outline"
                >
                        <Trash className="size-4 mr-2" />
                    Delete transaction
                </Button>}
            </form>
        </Form>
    )
};