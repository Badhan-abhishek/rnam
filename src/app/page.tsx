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
import { CopyButton } from "@/copy-button";
import Link from "next/link";

export default function Home() {
  const { values: storeValues, clearStore, setValues } = useValuesStore();
  const [randomValues, setRandomValues] = useState<Values | null>(null);

  useEffect(() => {
    const getOrGenerateValues = () =>
      storeValues
        ? storeValues
        : {
            first: faker.person.firstName(),
            last: faker.person.lastName(),
            phoneNumber: faker.helpers.fromRegExp(
              /([1-9]{3}) [0-9]{3} [0-9]{4}/
            ),
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
      {currentValues ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex gap-2">
              First Name: {currentValues?.first}{" "}
              <CopyButton value={currentValues?.first} />
            </CardTitle>
            <CardTitle className="flex gap-2">
              Last Name: {currentValues?.last}{" "}
              <CopyButton value={currentValues?.last} />
            </CardTitle>
            <CardDescription className="flex gap-2 items-center">
              Phone Number: {currentValues?.phoneNumber}{" "}
              <CopyButton value={currentValues?.phoneNumber} />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              {" "}
              Address:
              {currentValues?.street}, {currentValues?.city},{" "}
              {currentValues?.country} {currentValues?.zipcode}
            </p>
          </CardContent>
          <CardContent>
            <p className="flex gap-2 items-center">
              {currentValues?.randomEmail}{" "}
              <CopyButton value={currentValues?.randomEmail} />
            </p>
          </CardContent>
          <CardFooter>
            {storeValues ? (
              <div>
                <Button
                  onClick={() => {
                    clearStore();
                  }}
                >
                  Clear Persist Store
                </Button>
                <Link target="_blank" href={window.location.href}>
                  <Button variant={"link"}>Persist New User</Button>
                </Link>
              </div>
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
      ) : null}
    </main>
  );
}
