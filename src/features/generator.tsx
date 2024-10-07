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
import { ValueStoreKey, Values, useValuesStore } from "@/lib/use-values-store";
import { useEffect, useState } from "react";
import { CopyButton } from "@/copy-button";
import { useGeneratorStore } from "@/lib/use-generator-store";
import { XCircleIcon } from "lucide-react";
import { INITIAL_GEN_COUNT } from "@/lib/constant";

interface GeneratorProps {
  valueStoreKey: ValueStoreKey;
}

export const Generator: React.FC<GeneratorProps> = ({ valueStoreKey }) => {
  const { values: allValues, setValues, removeKey } = useValuesStore();
  const [randomValues, setRandomValues] = useState<Values | null>(null);
  const { deleteGen, gens } = useGeneratorStore();

  const storeValues = allValues?.[valueStoreKey];

  // Probably there is better way to handle this
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
            }).toLowerCase(),
            country: faker.location.country(),
            city: faker.location.city(),
            zipcode: faker.location.zipCode(),
            street: faker.location.street(),
          };

    setRandomValues(getOrGenerateValues());
  }, [storeValues, valueStoreKey]);

  const handleRegen = () => {
    setRandomValues({
      first: faker.person.firstName(),
      last: faker.person.lastName(),
      phoneNumber: faker.helpers.fromRegExp(/([1-9]{3}) [0-9]{3} [0-9]{4}/),
      randomEmail: faker.internet.email({
        provider: "yopmail.com",
      }).toLowerCase(),
      country: faker.location.country(),
      city: faker.location.city(),
      zipcode: faker.location.zipCode(),
      street: faker.location.street(),
    });
  };

  const currentValues = storeValues ? storeValues : randomValues;

  if (!currentValues) {
    return null;
  }

  return (
    <Card className="relative">
      {gens.length === INITIAL_GEN_COUNT ? null : (
        <XCircleIcon
          className="absolute right-0 top-0 text-red-600 cursor-poointer"
          onClick={(e) => {
            e.stopPropagation();
            deleteGen(valueStoreKey);
            removeKey(valueStoreKey);
          }}
        />
      )}
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
                removeKey(valueStoreKey);
              }}
            >
              Clear Persist Store
            </Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Button
              onClick={() => {
                if (!currentValues) return;
                setValues(currentValues, valueStoreKey);
              }}
            >
              Persist these values
            </Button>
            <Button onClick={handleRegen}>Reload</Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};
