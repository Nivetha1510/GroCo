/* Shared switch used wherever a quantity stepper picks a unit (e.g. g/kg or ml/L). */
export default function UnitToggle({ unit, units = ['g', 'kg'], onChange }) {
  return (
    <div className="unit-toggle">
      {units.map((u) => (
        <button
          key={u}
          type="button"
          className={`unit-toggle__btn ${unit === u ? 'is-active' : ''}`}
          aria-pressed={unit === u}
          onClick={() => onChange(u)}
        >
          {u}
        </button>
      ))}
    </div>
  );
}
