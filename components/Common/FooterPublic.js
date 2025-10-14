    
export default function FooterPublic() {
    return (
        <footer className="border-t border-gray-200 bg-primary dark:border-gray-700 py-4 text-sm dark:bg-gray-900 text-gray-100 dark:text-gray-100">
        <div className="flex flex-col sm:flex-row justify-between items-center px-5 gap-2">
            {/* Left side */}
            <p className="text-gray-100 dark:text-gray-400 text-center sm:text-left">
            © {new Date().getFullYear()}. VetEZ. All rights reserved.
            </p>

            {/* Right side */}
            <div className="flex flex-wrap justify-center sm:justify-end gap-4 text-blue-100 dark:text-blue-400">
            <a href="#">Contact</a>
            <a href="#">Conditions of Use</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Accessibility</a>
            </div>
        </div>
    </footer>
    )
}