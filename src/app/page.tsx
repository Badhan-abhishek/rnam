"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { faker } from "@faker-js/faker/locale/en_US";
import { Values, useValuesStore } from "../../lib/use-values-store";
import { useEffect, useState } from "react";

export default function Home() {
  const { values: storeValues, clearStore, setValues } = useValuesStore();
  const [randomValues, setRandomValues] = useState<Values | null>(null);

  useEffect(() => {
    const getOrGenerateValues = () =>
      storeValues
        ? storeValues
        : {
            name: faker.person.fullName(),
            phoneNumber: faker.phone.number(),
            randomEmail: faker.internet.email({
              provider: "yopmail.com",
            }),
            country: faker.location.country(),
            city: faker.location.city(),
            zipcode: faker.location.zipCode(),
            street: faker.location.street(),
          };

    setRandomValues(getOrGenerateValues());
  }, [storeValues]);

  const currentValues = storeValues ? storeValues : randomValues;

  return (
    <main className="grid place-content-center flex-1">
      <Card>
        <CardHeader>
          <CardTitle>{currentValues?.name}</CardTitle>
          <CardDescription>{currentValues?.phoneNumber}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            {currentValues?.street}, {currentValues?.city},{" "}
            {currentValues?.country} {currentValues?.zipcode}
          </p>
        </CardContent>
        <CardContent>
          <p>{currentValues?.randomEmail}</p>
        </CardContent>
        <CardFooter>
          {storeValues ? (
            <Button
              onClick={() => {
                clearStore();
              }}
            >
              Clear Persist Store
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  if (!currentValues) return;
                  setValues(currentValues);
                }}
              >
                Persist these values
              </Button>
              <Button
                onClick={() => {
                  window.location.reload();
                }}
              >
                Reload
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </main>
  );
}
