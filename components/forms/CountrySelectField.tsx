"use client";

import * as React from "react";
import { Controller } from "react-hook-form";
import countryList from "react-select-country-list";
import { Check, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

type CountryOption = {
  label: string;
  value: string;
};

interface CountrySelectFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  control: any;
  error?: any;
  required?: boolean;
}

const countries = countryList().getData() as CountryOption[];

const CountrySelectField = ({
  name,
  label,
  placeholder = "Select country",
  control,
  error,
  required = false,
}: CountrySelectFieldProps) => {
  return (
    <div className="space-y-2">
      <Label className="form-label">{label}</Label>

      <Controller
        name={name}
        control={control}
        rules={{
          required: required ? "Please select a country" : false,
        }}
        render={({ field }) => {
          const selectedCountry = countries.find(
            (c) => c.value === field.value
          );

          return (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "country-select-trigger",
                    !field.value && "text-gray-500"
                  )}
                >
                  {selectedCountry ? (
                    <span className="flex items-center gap-3">
                      <img
                        src={`https://flagcdn.com/w20/${selectedCountry.value.toLowerCase()}.png`}
                        alt={selectedCountry.label}
                        className="h-4 w-6 rounded-sm"
                      />
                      <span>{selectedCountry.label}</span>
                    </span>
                  ) : (
                    placeholder
                  )}
                  <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-full p-0 bg-gray-800 border-gray-600">
                <Command>
                  <CommandInput
                    placeholder="Search country..."
                    className="country-select-input"
                  />

                  <CommandEmpty className="country-select-empty">
                    No country found.
                  </CommandEmpty>

                  <CommandGroup className="max-h-64 overflow-y-auto">
                    {countries.map((country) => (
                      <CommandItem
                        key={country.value}
                        value={country.label}
                        onSelect={() => field.onChange(country.value)}
                        className="country-select-item flex items-center gap-3"
                      >
                        <img
                          src={`https://flagcdn.com/w20/${country.value.toLowerCase()}.png`}
                          alt={country.label}
                          className="h-4 w-6 rounded-sm"
                        />
                        <span>{country.label}</span>
                        <Check
                          className={cn(
                            "ml-auto h-4 w-4",
                            field.value === country.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          );
        }}
      />

      {error && <p className="text-sm text-red-500 mt-1">{error.message}</p>}

      <p className="text-xs text-gray-500">
        Used to personalize market data and news.
      </p>
    </div>
  );
};

export default CountrySelectField;
