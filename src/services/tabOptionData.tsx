class TabOptionData {
  public static blockTypes = [
    { name: "Inline", value: "i" },
    { name: "V 60°", value: "v60" },
    { name: "V 90°", value: "v90" },
  ];
  public static inlineBlockTypes = [
    { name: "3", value: 3 },
    { name: "4", value: 4 },
    { name: "5", value: 5 },
    { name: "6", value: 6 },
    { name: "8", value: 8 },
  ];

  public static v60BlockTypes = [
    { name: "6", value: 6 },
    { name: "12", value: 12 },
  ];

  public static v90BlockTypes = [
    { name: "6", value: 6 },
    { name: "8", value: 8 },
    { name: "10", value: 10 },
    { name: "12", value: 12 },
  ];

  public static blockMaterials = [
    {
      name: "Cast Iron",
      //   placeholders
      density: 0,
      priceDensity: 0,
      maxPower: 0,
      maxTorque: 0,
      description:
        "Cast Iron blocks are heavy but strong and are used in lots of engines, especialy on the lower end of the market due to their low price",
    },
    {
      name: "Aluminium Alloy",

      //   placeholders
      density: 0,
      priceDensity: 0,
      maxPower: 0,
      maxTorque: 0,
      description:
        "Aluminium Alloy blocks are lighter than cast iron blocks and are used in more expensive modern engines",
    },
    {
      name: "VGCI",

      //   placeholders
      density: 0,
      priceDensity: 0,
      maxPower: 0,
      maxTorque: 0,
      description:
        "VGCI blocks are a mix of cast iron and aluminium and are used in high-performance engines",
    },
    {
      name: "Titanium",

      //   placeholders
      density: 0,
      priceDensity: 0,
      maxPower: 0,
      maxTorque: 0,
      description:
        "Titanium blocks are very expensive but are used in the most high-performance engines",
    },
  ];
  public static headMaterials = this.blockMaterials;

  public static pistonMaterials = [
    {
      name: "Aluminium Alloy",
      //   placeholders
      density: 0,
      priceDensity: 0,
      maxPower: 0,
      maxTorque: 0,
      description:
        "Aluminium alloy pistons are lightweight and have good thermal conductivity. They are used in most modern engines.",
    },
    {
      name: "Forged Aluminium",
      //   placeholders
      density: 0,
      priceDensity: 0,
      maxPower: 0,
      maxTorque: 0,
      description:
        "Forged aluminium pistons are stronger than cast pistons and are used in high-performance engines.",
    },
    {
      name: "Hypereutectic",
      //   placeholders
      density: 0,
      priceDensity: 0,
      maxPower: 0,
      maxTorque: 0,
      description:
        "Hypereutectic pistons are made from an aluminium-silicon alloy and are used in high-performance engines.",
    },
    {
      name: "Steel",
      //   placeholders
      density: 0,
      priceDensity: 0,
      maxPower: 0,
      maxTorque: 0,
      description:
        "Steel pistons are strong and durable and are used in heavy-duty engines such as trucks and tractors.",
    },
  ];
}

export default TabOptionData;
