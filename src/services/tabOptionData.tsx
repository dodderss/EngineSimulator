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
      value: "castIron",
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
      value: "aluminiumAlloy",
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
      value: "vgci",
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
      value: "titanium",
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
      value: "aluminiumAlloy",
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
      value: "forgedAluminium",
      //   placeholders
      density: 0,
      priceDensity: 0,
      maxPower: 0,
      maxTorque: 0,
      description:
        "Forged aluminium pistons are stronger than cast pistons and are used in high-performance engines.",
    },
    {
      name: "Hypereutectic Aluminium",
      value: "hypereutectic",
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
      value: "steel",
      //   placeholders
      density: 0,
      priceDensity: 0,
      maxPower: 0,
      maxTorque: 0,
      description:
        "Steel pistons are strong and durable and are used in heavy-duty engines such as trucks and tractors.",
    },
  ];
  public static headTypes = [
    {
      name: "Single Overhead Cam",
      value: "sohc",
      //   placeholders
      frictionalLoss: 0,
      weight: 0,
      description:
        "Single Overhead Cam heads have one camshaft per cylinder bank that operates both the intake and exhaust valves.",
    },
    {
      name: "Dual Overhead Cam",
      value: "dohc",
      //   placeholders
      frictionalLoss: 0,
      weight: 0,
      description:
        "Dual Overhead Cam heads have two camshafts per cylinder bank, one for the intake valves and one for the exhaust valves.",
    },
    {
      name: "Pushrod",
      value: "pushrod",
      //   placeholders
      frictionalLoss: 0,
      weight: 0,
      description:
        "Pushrod heads have a single camshaft in the engine block that operates the valves via pushrods and rocker arms.",
    },
  ];

  public static aspirationTypes = [
    {
      name: "Naturally Aspirated",
      value: "na",
      allowsBoostControls: false,
    },
    {
      name: "Turbocharged",
      value: "turbo",
      allowsBoostControls: true,
    },
    {
      name: "Supercharged",
      value: "super",
      allowsBoostControls: true,
    },
  ];

  public static fuelQualities = [
    {
      name: "80 Octane",
      value: "80",
      // placeholder
      performanceEffector: 0,
    },
    {
      name: "90 Octane",
      value: "90",
      // placeholder
      performanceEffector: 0,
    },
    {
      name: "95 Octane",
      value: "95",
      // placeholder
      performanceEffector: 0,
    },
    {
      name: "100 Octane",
      value: "100",
      // placeholder
      performanceEffector: 0,
    },
  ];

  public static intakeTypes = [
    {
      name: "Carborated",
      value: "carb",
      // placeholder
      performanceEffector: 0,
    },
    {
      name: "Mechanical Injection",
      value: "mechInj",
      // placeholder
      performanceEffector: 0,
    },
    {
      name: "Electronic Injection",
      value: "efi",
      // placeholder
      performanceEffector: 0,
    },
  ];
}

export default TabOptionData;
