import { HistoryInteractions } from "@/components/main/history/history-interactions";

const HistoryPage = () => {
  return (
    <div className="px-4 lg:px-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold ">Historial de Interacciones</h1>
        <p className="text-gray-500 mt-1">
          Registro de todas las interacciones realizadas por los dispositivos
        </p>
      </div>
      <HistoryInteractions />
    </div>
  );
};

export default HistoryPage;
