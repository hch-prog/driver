import Link from "next/link";
import React from 'react';

export default function HelpPage() {
    return (
        <div className="min-h-screen bg-gray-50 font-sans p-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-800 mb-6">Help & Support</h1>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Getting Started</h2>
                    <p className="text-gray-600">
                        Welcome to Arc Drive! To get started, upload your files using the upload button on your dashboard. You can organize files into folders and store them. For more details on how this is built, visit the <a href="https://github.com/hch-prog/driver" className="text-blue-500 hover:underline">Github</a>.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Frequently Asked Questions (FAQs)</h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-medium text-gray-800">How do I upload files?</h3>
                            <p className="text-gray-600">
                                You can upload files by clicking the "Upload File" button on your dashboard. Select the files from your computer, and they will be added to your drive.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium text-gray-800">How do I create folders?</h3>
                            <p className="text-gray-600">
                                To create a folder, click on the "Add Folder" button. You can name the folder and start adding files to it immediately.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium text-gray-800">How do I share files?</h3>
                            <p className="text-gray-600">
                                You can share files by selecting the file and clicking the "Share" button. Enter the email of the person you want to share with, and they will receive a link to access the file.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Contact Support</h2>
                    <p className="text-gray-600">
                        If you have any issues or need further assistance, feel free to contact our support team. We are here to help you 24/7. Reach us via email at <a href="mailto:support@arcdrive.com" className="text-blue-500 hover:underline">support@arcdrive.com</a>.
                    </p>
                </section>

                <footer className="flex flex-col sm:flex-row items-center justify-between py-6 w-full px-4 md:px-6 border-t">
                    <p className="text-xs text-[#666] flex-1 text-left">&copy; 2024 Drive App. All rights reserved.</p>

                    <p className="text-xs text-[#666] mx-auto">Developed By Harsh</p>

                    <nav className="flex-1 flex justify-end gap-4 sm:gap-6">
                        <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
                            Github
                        </Link>
                        <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
                            Terms of Service
                        </Link>
                        <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
                            Privacy
                        </Link>
                    </nav>
                </footer>

            </div>
        </div>
    );
}
