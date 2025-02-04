import * as Accordion from "@radix-ui/react-accordion";
import React, { useState } from "react";

interface AccordionProps {
  title: string;
  turno: string;
  children: React.ReactNode;
}

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Accordion.Trigger>
>(({ children, className, ...props }, forwardedRef) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Accordion.Header>
      <Accordion.Trigger
        {...props}
        ref={forwardedRef}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex items-center justify-between w-full p-7 bg-white border border-gray-200 transition-all duration-75 ${
          isOpen ? "rounded-tr-3xl rounded-tl-3xl" : "rounded-3xl"
        }`}
      >
        {children}
      </Accordion.Trigger>
    </Accordion.Header>
  );
});

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Accordion.Content>
>(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Content
    className="w-full overflow-hidden rounded-br-3xl rounded-bl-3xl"
    {...props}
    ref={forwardedRef}
  >
    {children}
  </Accordion.Content>
));

export const CustomAccordion: React.FC<AccordionProps> = ({
  title,
  turno,
  children,
}) => {
  return (
    <Accordion.Root type="single" collapsible className="w-full">
      <Accordion.Item value="item-1">
        <AccordionTrigger>
          <h2 className="text-[#1b1b1b] text-xl font-semibold">{title}</h2>
          <p className="text-[#1b1b1b] text-xl font-semibold">Turno: {turno}</p>
        </AccordionTrigger>
        <AccordionContent>{children}</AccordionContent>
      </Accordion.Item>
    </Accordion.Root>
  );
};
