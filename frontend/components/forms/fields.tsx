import clsx from "clsx";
import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

const inputClasses =
  "w-full rounded-xl border bg-[var(--surface-3)] px-4 py-2.5 text-sm text-paper placeholder:text-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-500/30";

function FieldShell({
  label,
  htmlFor,
  error,
  required,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-paper">
        {label} {required ? <span className="text-accent-400">*</span> : null}
      </label>
      {hint ? <p className="mt-0.5 text-xs text-slate-400">{hint}</p> : null}
      <div className="mt-1.5">{children}</div>
      {error ? (
        <p className="mt-1.5 text-xs text-red-400" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  error?: string;
  hint?: string;
};

export function TextField({ label, name, error, hint, required, className, ...rest }: TextFieldProps) {
  return (
    <FieldShell label={label} htmlFor={name} error={error} required={required} hint={hint}>
      {/* Password managers and similar extensions inject attributes/styles
          into inputs after the server-rendered HTML loads, which React
          otherwise flags as a hydration mismatch — see
          https://react.dev/link/hydration-mismatch. */}
      <input
        id={name}
        name={name}
        required={required}
        aria-invalid={Boolean(error)}
        suppressHydrationWarning
        className={clsx(inputClasses, error ? "border-red-400/50" : "border-[var(--border-2)]", className)}
        {...rest}
      />
    </FieldShell>
  );
}

type TextAreaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  name: string;
  error?: string;
  hint?: string;
};

export function TextAreaField({
  label,
  name,
  error,
  hint,
  required,
  className,
  ...rest
}: TextAreaFieldProps) {
  return (
    <FieldShell label={label} htmlFor={name} error={error} required={required} hint={hint}>
      <textarea
        id={name}
        name={name}
        required={required}
        aria-invalid={Boolean(error)}
        suppressHydrationWarning
        className={clsx(
          inputClasses,
          "min-h-32 resize-y",
          error ? "border-red-400/50" : "border-[var(--border-2)]",
          className
        )}
        {...rest}
      />
    </FieldShell>
  );
}

type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  options: ReadonlyArray<{ value: string; label: string }>;
  placeholder?: string;
};

export function SelectField({
  label,
  name,
  error,
  hint,
  required,
  options,
  placeholder,
  className,
  ...rest
}: SelectFieldProps) {
  return (
    <FieldShell label={label} htmlFor={name} error={error} required={required} hint={hint}>
      <select
        id={name}
        name={name}
        required={required}
        aria-invalid={Boolean(error)}
        className={clsx(
          inputClasses,
          error ? "border-red-400/50" : "border-[var(--border-2)]",
          className
        )}
        {...rest}
      >
        {placeholder ? <option value="">{placeholder}</option> : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}

export function CheckboxGroupField({
  label,
  error,
  hint,
  options,
  values,
  onChange,
}: {
  label: string;
  error?: string;
  hint?: string;
  options: ReadonlyArray<{ value: string; label: string }>;
  values: string[];
  onChange: (values: string[]) => void;
}) {
  function toggle(value: string) {
    onChange(values.includes(value) ? values.filter((v) => v !== value) : [...values, value]);
  }

  return (
    <div>
      <span className="block text-sm font-medium text-paper">{label}</span>
      {hint ? <p className="mt-0.5 text-xs text-slate-400">{hint}</p> : null}
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((option) => {
          const active = values.includes(option.value);
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={active}
              onClick={() => toggle(option.value)}
              className={clsx(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                active
                  ? "border-accent-400 bg-accent-500/15 text-accent-400"
                  : "border-[var(--border-2)] bg-[var(--surface-3)] text-slate-300 hover:border-[var(--border-4)]"
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
      {error ? (
        <p className="mt-1.5 text-xs text-red-400" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
