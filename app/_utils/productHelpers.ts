export const PROPERTIES_COLUMNS = [
  "model",
  "capacity",
  "ram",
  "color",
  "battery",
  "processor",
  "graphics",
  "chipset",
  "connectivity",
  "navigation",
  "audio",
  "sensors",
  "features",
  "weight",
  "dimensions",
  "fastcharging",
  "frontcamera",
  "network2g",
  "network3g",
  "network4g",
  "network5g",
  "operatingsystem",
  "rearcamera",
  "screenresolution",
  "screensize",
  "screentype",
  "simcard",
];

export function formatPropertiesForPrisma(
  properties: Record<string, string | boolean | number>,
) {
  const standardProps: Record<string, any> = {};
  const specs: Record<string, any> = {};

  Object.entries(properties).forEach(([key, value]) => {
    const lowerKey = key.toLowerCase();

    // Handle fastcharging boolean conversion specifically if needed,
    // though usually the form sends strings.
    let processedValue = value;
    if (lowerKey === "fastcharging" && typeof value === "string") {
      processedValue = ["true", "1", "si", "sim", "yes", "s"].includes(
        value.toLowerCase(),
      );
    }

    if (PROPERTIES_COLUMNS.includes(lowerKey)) {
      standardProps[lowerKey] = processedValue;
    } else {
      specs[lowerKey] = processedValue;
    }
  });

  return {
    ...standardProps,
    specs: Object.keys(specs).length > 0 ? specs : undefined,
  };
}

export function flattenProperties(properties: any) {
  if (!properties) return {};

  const { id, productId, specs, ...standardProps } = properties;

  // Merge standard columns with specs
  // Specs take precedence if they exist (though they shouldn't clash in a clean DB)
  // or maybe standard props should take precedence?
  // Let's ignore null standard props.

  const cleanStandardProps = Object.entries(standardProps).reduce(
    (acc, [key, value]) => {
      if (value !== null && value !== "") {
        acc[key] = value;
      }
      return acc;
    },
    {} as Record<string, any>,
  );

  const specsObj = typeof specs === "object" && specs !== null ? specs : {};

  return { ...cleanStandardProps, ...specsObj };
}
