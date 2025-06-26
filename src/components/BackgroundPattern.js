export default function BackgroundPattern() {
    return (
        <div className="fixed inset-0 opacity-10 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-radial-multiple animate-float"
                style={{
                    backgroundImage: `
               radial-gradient(circle at 20% 50%, #00f5ff 0%, transparent 50%),
               radial-gradient(circle at 80% 20%, #0080ff 0%, transparent 50%),
               radial-gradient(circle at 40% 80%, #00f5ff 0%, transparent 50%)
             `
                }}
            />
        </div>
    )
}