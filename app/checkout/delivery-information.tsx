'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { addAddress, getRecentAddress } from '@/actions/address';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader
} from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';
import { AddAddressSchema } from '@/lib/validation/address';
import { zodResolver } from '@hookform/resolvers/zod';

type AddressFormProps = {
  onAddressUpdate: (...x: any) => any;
};

function AddressForm({ onAddressUpdate }: AddressFormProps) {
  const form = useForm<AddAddressSchema>({
    resolver: zodResolver(AddAddressSchema)
  });
  const { data: postalData, refetch } = useQuery({
    queryFn: async () => {
      const pincode = form.watch('pincode');
      if (!pincode) return null;
      const { data } = await axios.get(
        `https://api.postalpincode.in/pincode/${pincode}`
      );
      return data;
    },
    queryKey: ['pincode', form.watch('pincode')],
    enabled: false
  });

  const onValid = async (data: AddAddressSchema) => {
    const address = await addAddress(data);
    console.log(address);
    onAddressUpdate();
  };

  useEffect(() => {
    if (!postalData) return;
    const postOffice = postalData[0].PostOffice[0];
    form.setValue('city', postOffice.District, { shouldDirty: false });
    form.setValue('state', postOffice.State, { shouldDirty: false });
  }, [postalData]);
  return (
    <Form {...form}>
      <form className="mt-10 space-y-5" onSubmit={form.handleSubmit(onValid)}>
        <FormField
          name="pincode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pincode</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onBlur={async () => {
                    field.onBlur();
                    await refetch({});
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="houseNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Flat, House no., Building, Company, Apartment
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="area"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Area, Street, Sector, Village</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="landmark"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Landmark</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex gap-4">
          <FormField
            name="city"
            render={({ field }) => (
              <div className="flex-grow">
                <FormItem>
                  <FormLabel>City / District</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              </div>
            )}
          />
          <FormField
            name="state"
            render={({ field }) => (
              <div className="flex-grow">
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              </div>
            )}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export function DeliveryInformation() {
  const {
    data: recentAddress,
    isLoading,
    refetch
  } = useQuery({
    queryFn: async () => await getRecentAddress(),
    queryKey: ['recent-address']
  });

  const [isOpen, setIsOpen] = useState(false);
  const onAddressUpdate = () => {
    refetch();
    setIsOpen(false);
  };
  return (
    <Card className="p-4 h-fit">
      <div className="text-xl font-semibold">Delivery Information</div>
      {recentAddress ? (
        <div className="my-5">
          <div>{recentAddress.houseNo}</div>
          <div>{recentAddress.area}</div>
          <div>
            {recentAddress.city}, {recentAddress.state} ({recentAddress.pincode}
            )
          </div>
        </div>
      ) : null}

      <Button
        variant="link"
        className="inline-flex p-0"
        onClick={() => setIsOpen(true)}
      >
        {recentAddress == null ? 'add address' : 'change address'}
      </Button>
      <Dialog open={isOpen} onOpenChange={(v) => setIsOpen(v)}>
        <DialogContent>
          <DialogHeader className="text-xl font-semibold">
            Add new address
          </DialogHeader>
          <DialogDescription>
            This address will be used in all new orders
          </DialogDescription>
          <AddressForm onAddressUpdate={onAddressUpdate} />
        </DialogContent>
      </Dialog>
    </Card>
  );
}
