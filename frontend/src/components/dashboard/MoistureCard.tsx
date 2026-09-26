interface MoistureCardProps {
  value: number;
}

export default function MoistureCard({
  value,
}: MoistureCardProps) {
  return (
    <article className="rounded-2xl bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-lg font-semibold text-slate-800">
          Humedad promedio
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Durante el periodo seleccionado
        </p>
      </div>

      <div className="mt-8 flex flex-col items-center">
        <div
          className="relative flex h-48 w-48 items-center justify-center rounded-full"
          style={{
            background: `conic-gradient(
              #1685a3 ${value}%,
              #d8edf1 ${value}% 100%
            )`,
          }}
        >
          {/* Inner circle */}
          <div className="flex h-36 w-36 flex-col items-center justify-center rounded-full bg-white">
            <span className="text-4xl font-bold text-slate-800">
              {value}%
            </span>

            <span className="mt-1 text-sm text-slate-500">
              humedad
            </span>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-lg font-semibold text-[#1685a3]">
            Nivel óptimo
          </p>

          <p className="mt-1 max-w-xs text-sm text-slate-500">
            La humedad del suelo se encuentra
            dentro del rango recomendado.
          </p>
        </div>
      </div>
    </article>
  );
}