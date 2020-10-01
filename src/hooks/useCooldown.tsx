import React, { useEffect, useState } from "react";

const useCooldown = (cooldownTime: number) => {
  const [cooldown, setCooldown] = useState(cooldownTime);

  const resetCooldown = () => {
    setCooldown(cooldownTime);
  };

  const calculateTimeLeft = () => {
    if (cooldown === 0) {
      return;
    }
    setCooldown((prevState) => prevState - 1);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      calculateTimeLeft();
    }, 1000);

    return () => clearTimeout(timer);
  }, [cooldown]);

  return [cooldown, resetCooldown] as const;
};

export default useCooldown;
