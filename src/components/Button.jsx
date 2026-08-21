// Tambahkan parameter "className = ''" agar styling tambahan bisa masuk
function Button({ children, onClick, variant = "primary", className = "" }) {
    const baseStyle = "px-4 py-2 rounded-lg font-medium transition";
    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    };

    return (
        <button
        className={`${baseStyle} ${variants[variant]} ${className}`}
        onClick={onClick}
        >
        {children}
        </button>
    );
}

export default Button;