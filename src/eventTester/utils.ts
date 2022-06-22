export function randint(min: number, max: number): number {
  if (min < 0 && max < 0) {
    const absMin = Math.abs(min);
    const absMax = Math.abs(max);
    return -Math.round(Math.random() * (absMax - absMin) + absMin);
  }

  return Math.round(Math.random() * (max - min) + min);
}

export function getRandomSkill(): string {
  return ["weapons", "shields", "pilot", "engines", "combat", "repair"][
    randint(0, 5)
  ];
}

