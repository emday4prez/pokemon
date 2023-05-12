import mockupSrc from "../assets/ui.png";

export const Mockup = () => (
  <div className="p-8 mt-8">
    <div className="w-[75%] flex flex-col border-4 border-indigo-500 p-8">
      <h2 className="text-xl font-bold">UI:</h2>
      <img src={mockupSrc} />
    </div>
  </div>
);
