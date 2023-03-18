import dayjs from 'dayjs'
import { useFieldArray, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from '../GlobalStyled'
import { createInvoice } from '../service/invoice'

interface InvoiceItem {
  itemName: string
  unit: string
  quantity: number
  price: number
}
interface InvoiceForm {
  customerLastName: string
  customerFirstName: string
  customerEmail: string
  customerAddress: string
  note: string
  customerPhone: string
  currency: string
  bankAccount: string
  bankNumber: string

  items: InvoiceItem[]
}

export default function NewInvoice() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<InvoiceForm>({
    shouldUseNativeValidation: true,
    defaultValues: {
      currency: 'USD',
      items: [
        {
          itemName: '',
          unit: 'KG',
          quantity: 1,
          price: 1000,
        },
      ],
    },
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  })

  const { mutate, isLoading } = useMutation(createInvoice, {
    onSuccess: () => {
      navigate('/')
    },
  })

  const onCreate = (values: InvoiceForm) => {
    const data = {
      bankAccount: {
        bankId: '',
        sortCode: '09-01-01',
        accountNumber: values.bankNumber,
        accountName: values.bankAccount,
      },
      customer: {
        firstName: values.customerFirstName,
        lastName: values.customerLastName,
        contact: {
          email: values.customerEmail,
          mobileNumber: values.customerPhone,
        },
        addresses: [
          {
            premise: values.customerAddress.split(',')[0],
            city: values.customerAddress.split(',')[1],
            postcode: values.customerAddress.split(',')[2],
            county: values.customerAddress.split(',')[3],
            countryCode: values.customerAddress.split(',')[4],
          },
        ],
      },
      documents: [
        {
          documentId: '96ea7d60-89ed-4c3b-811c-d2c61f5feab2',
          documentName: 'Bill',
          documentUrl: 'http://url.com/#123',
        },
      ],
      invoiceReference: '#123456',
      invoiceNumber: 'INV' + Math.round(Math.random() * 1000000000),
      currency: values.currency,
      invoiceDate: dayjs().format('YYYY-MM-DD'),
      dueDate: dayjs().add(7, 'days').format('YYYY-MM-DD'),

      description: values.note,
      customFields: [
        {
          key: 'invoiceCustomField',
          value: 'value',
        },
      ],
      extensions: [
        {
          addDeduct: 'ADD',
          value: 10,
          type: 'PERCENTAGE',
          name: 'tax',
        },
        {
          addDeduct: 'DEDUCT',
          type: 'FIXED_VALUE',
          value: 10.0,
          name: 'discount',
        },
      ],
      items: values.items.map((a) => ({
        itemReference: 'itemRef',
        description: a.itemName,
        quantity: a.quantity,
        rate: a.price,
        itemName: a.itemName,
        itemUOM: a.unit,
        customFields: [
          // {
          //   key: 'taxiationAndDiscounts_Name',
          //   value: 'VAT',
          // },
        ],
        extensions: [
          // {
          //   addDeduct: 'ADD',
          //   value: 10,
          //   type: 'FIXED_VALUE',
          //   name: 'tax',
          // },
          // {
          //   addDeduct: 'DEDUCT',
          //   value: 10,
          //   type: 'PERCENTAGE',
          //   name: 'tax',
          // },
        ],
      })),
    }

    mutate(data)
  }

  return (
    <Styled.Wrap>
      <Styled.Form onSubmit={handleSubmit(onCreate)}>
        <Styled.FormItem md={12}>
          <h3>Create new Invoice</h3>
        </Styled.FormItem>
        <Styled.FormItem md={12}>
          <hr />
        </Styled.FormItem>
        <Styled.FormItem md={6}>
          <Styled.Label>Customer First name</Styled.Label>
          <Styled.Input
            {...register('customerFirstName', { required: true })}
          />
        </Styled.FormItem>

        <Styled.FormItem md={6}>
          <Styled.Label>Customer Last name</Styled.Label>
          <Styled.Input {...register('customerLastName', { required: true })} />
        </Styled.FormItem>
        <Styled.FormItem md={6}>
          <Styled.Label>Customer Email</Styled.Label>
          <Styled.Input {...register('customerEmail', { required: true })} />
        </Styled.FormItem>
        <Styled.FormItem md={6}>
          <Styled.Label>Customer Phone</Styled.Label>
          <Styled.Input {...register('customerPhone', { required: true })} />
        </Styled.FormItem>

        <Styled.FormItem md={12}>
          <Styled.Label>Customer Address</Styled.Label>
          <Styled.Input
            placeholder='Use "," split with address, city, code, country, country code '
            {...register('customerAddress', { required: true })}
          />
        </Styled.FormItem>

        <Styled.FormItem md={12}>
          <hr />
        </Styled.FormItem>

        <Styled.FormGroup>
          <Styled.FormItem md={4}>
            <Styled.Label>Product Name</Styled.Label>
          </Styled.FormItem>

          <Styled.FormItem md={2}>
            <Styled.Label className="text-right">Price</Styled.Label>
          </Styled.FormItem>
          <Styled.FormItem md={2}>
            <Styled.Label className="text-right">Quantity</Styled.Label>
          </Styled.FormItem>
          <Styled.FormItem md={2}>
            <Styled.Label>Unit</Styled.Label>
          </Styled.FormItem>
          <Styled.FormItem md={2}>
            <Styled.Label>Actions</Styled.Label>
          </Styled.FormItem>
          {fields.map((field, index) => (
            <>
              <Styled.FormItem md={4}>
                <Styled.Input
                  placeholder="Product Name"
                  {...register(`items.${index}.itemName`, { required: true })}
                />
              </Styled.FormItem>

              <Styled.FormItem md={2}>
                <Styled.Input
                  placeholder="Price"
                  className="text-right"
                  type="number"
                  {...register(`items.${index}.price`, { required: true })}
                />
              </Styled.FormItem>
              <Styled.FormItem md={2}>
                <Styled.Input
                  placeholder="Quantity"
                  className="text-right"
                  type="number"
                  {...register(`items.${index}.quantity`, { required: true })}
                />
              </Styled.FormItem>
              <Styled.FormItem md={2}>
                <Styled.Select
                  {...register(`items.${index}.unit`, { required: true })}
                >
                  <option>KG</option>
                  <option>M</option>
                  <option>M2</option>
                </Styled.Select>
              </Styled.FormItem>
              <Styled.FormItem md={2}>
                {fields.length > 1 && (
                  <Styled.RemoveBtn type="button" onClick={() => remove(index)}>
                    Remove
                  </Styled.RemoveBtn>
                )}
              </Styled.FormItem>
            </>
          ))}

          <Styled.FormItem md={12}>
            <Styled.AddBtn
              type="button"
              onClick={() =>
                append({ itemName: '', quantity: 1, unit: 'KG', price: 1 })
              }
            >
              Add item
            </Styled.AddBtn>
          </Styled.FormItem>
        </Styled.FormGroup>

        <Styled.FormItem md={12}>
          <hr />
        </Styled.FormItem>
        <Styled.FormItem md={4}>
          <Styled.Label>Currency</Styled.Label>
          <Styled.Select {...register('currency')}>
            <option>VND</option>
            <option>USD</option>
            <option>EUR</option>
          </Styled.Select>
        </Styled.FormItem>
        <Styled.FormItem md={4}>
          <Styled.Label>Bank number</Styled.Label>
          <Styled.Input {...register('bankNumber')} />
        </Styled.FormItem>

        <Styled.FormItem md={4}>
          <Styled.Label>Bank account</Styled.Label>
          <Styled.Input {...register('bankAccount')} />
        </Styled.FormItem>

        <Styled.FormItem md={12}>
          <Styled.Label>Note</Styled.Label>
          <Styled.TextArea {...register('note')} />
        </Styled.FormItem>
        <Styled.FormItem md={12}>
          <Styled.Button type="submit" disabled={isLoading}>
            Create new Invoice
          </Styled.Button>
        </Styled.FormItem>
      </Styled.Form>
    </Styled.Wrap>
  )
}

const Styled = {
  Wrap: styled.div`
    margin: 24px auto;
    border: 1px solid #f4f4f4;
    max-width: 700px;
    padding: 24px;
    background: white;
    border-radius: 4px;

    hr {
      margin: 0;
      opacity: 0.2;
    }
  `,
  Form: styled.form`
    display: flex;
    flex-wrap: wrap;
  `,
  FormItem: styled.div<{ md?: number; sm?: number }>`
    padding: 6px;
    width: ${({ md = 12 }) => (100 / 12) * md}%;
  `,
  FormGroup: styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  `,
  Label: styled.label`
  display: block;
  font-weight: bold;
  color #555;
  margin-bottom: 4px;
  font-size: 12px;
  `,
  TextArea: styled.textarea`
    display: block;
    width: 100%;
    min-height: 100px;
    border: 1px solid #f4f4f4;
    padding-left: 12px;
  `,
  Input: styled.input`
    display: block;
    width: 100%;
    height: 35px;
    border: 1px solid #f4f4f4;
    padding-left: 12px;
  `,
  Select: styled.select`
    display: block;
    width: 100%;
    height: 35px;
    border: 1px solid #f4f4f4;
    padding-left: 12px;
  `,

  Button: styled(Button)`
    width: 100%;
  `,
  TextError: styled.p`
    font-size: 12px;
    color: red;
    position: absolute;
    padding: 4px 0;
  `,
  AddBtn: styled.button`
    border: none;
    cursor: pointer;
    color: #007bff;
    background: rgb(176 214 255);
    height: 35px;
    width: 100%;
  `,
  RemoveBtn: styled.button`
    border: none;
    cursor: pointer;
    color: red;
    background: #ffeeee;
    height: 35px;
    width: 100%;
  `,
}
