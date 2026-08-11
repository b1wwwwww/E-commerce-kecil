// components/Badge.jsx
function Badge({ text, color = "red" }) {
    const colors = {
        red: "bg-red-100 text-red-600",
        green: "bg-green-100 text-green-600",
        yellow: "bg-yellow-100 text-yellow-600",
    };

    return (
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${colors[color]}`}>
        {text}
        </span>
    );
}

export default Badge;