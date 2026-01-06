import {
    Lock,
    EyeOff,
    CloudUpload,
    Globe,
    Trash,
    SquarePen,
    Repeat,
    Mail,
} from 'lucide-react';
import Link from 'next/link';
import { HiOutlineDocumentDownload } from "react-icons/hi";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { HiOutlineHandRaised } from "react-icons/hi2";

export default function DataProtectionSection({ className = '' }) {
    const protectionMeasures = [
        {
            id: 1,
            title: 'Data Encryption',
            description: 'All data encrypted at rest using AES-256 and in transit using TLS 1.3 protocols',
            icon: Lock,
        },
        {
            id: 2,
            title: 'Access Logging',
            description: 'Comprehensive audit trails tracking all data access and modifications',
            icon: HiOutlineClipboardDocumentList,
        },
        {
            id: 3,
            title: 'Data Anonymization',
            description: 'Personal identifiable information automatically anonymized for analytics',
            icon: EyeOff,
        },
        {
            id: 4,
            title: 'Backup & Recovery',
            description: 'Automated daily backups with 30-day retention and instant recovery options',
            icon: CloudUpload,
        },
        {
            id: 5,
            title: 'Data Residency',
            description: 'UAE-based data centers ensuring compliance with local data sovereignty laws',
            icon: Globe,
        },
        {
            id: 6,
            title: 'Right to Deletion',
            description: 'Complete data deletion within 30 days upon request, GDPR compliant',
            icon: Trash,
        },
    ];

    const userRights = [
        {
            id: 1,
            title: 'Access Your Data',
            description: 'Request and receive a complete copy of all your stored data',
            icon: HiOutlineDocumentDownload,
        },
        {
            id: 2,
            title: 'Correct Information',
            description: 'Update or correct any inaccurate personal information',
            icon: SquarePen,
        },
        {
            id: 3,
            title: 'Data Portability',
            description: 'Export your data in machine-readable format for transfer',
            icon: Repeat,
        },
        {
            id: 4,
            title: 'Restrict Processing',
            description: 'Limit how we process your personal data',
            icon: HiOutlineHandRaised,
        },
    ];

    return (
        <section className="bg-[#F1F5F9] py-20 2xl:px-32 xl:px-28 lg:px-20 md:px-10 px-6 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header  */}
                <div className="flex flex-col items-center justify-center">
                    {/* <div className="text-center flex justify-center items-center gap-2 text-secondary font-semibold">
                        <PiChats name='messageIcon' size={16} />
                        Success Stories
                    </div> */}
                    <h2 className="max-w-3xl lg:text-5xl md:text-4xl text-3xl font-semibold text-primary text-center leading-none font-playfair">
                        Data Protection  <span className="text-secondary">Measures </span>
                    </h2>
                    <p className="text-gray-500 mt-6 lg:text-lg text-center">
                        Comprehensive data protection framework ensuring your information remains secure, private, and under your control
                    </p>
                </div>

                {/* Our Protection Measures */}
                <div className="mb-16 mt-10">
                    <h3 className="font-playfair text-2xl font-bold text-foreground mb-8 text-center">
                        Our Protection Measures
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {protectionMeasures.map((measure) => {
                            const Icon = measure.icon;
                            return (
                                <div
                                    key={measure.id}
                                    className="bg-white rounded-xl p-6 border border-gray-200 hover:border-accent/50 hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="flex items-start space-x-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                                            <Icon size={24} className="text-secondary" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-playfair text-lg font-bold text-foreground mb-2">
                                                {measure.title}
                                            </h4>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                {measure.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Your Data Rights */}
                <div className="bg-white rounded-2xl p-8 lg:p-12 border border-gray-200">
                    <h3 className="font-playfair text-2xl font-bold text-foreground mb-8 text-center">
                        Your Data Rights
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {userRights.map((right) => {
                            const Icon = right.icon;
                            return (
                                <div
                                    key={right.id}
                                    className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted transition-colors duration-300"
                                >
                                    <div className="flex-shrink-0 w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                                        <Icon size={20} className="text-secondary" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-playfair text-base font-bold text-foreground mb-1">
                                            {right.title}
                                        </h4>
                                        <p className="text-sm text-gray-500 leading-relaxed">
                                            {right.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Call to Action */}
                    <div className="text-center pt-6 border-t border-border">
                        <p className="text-gray-500 mb-4">
                            To exercise any of these rights, contact our Data Protection Officer
                        </p>
                        <Link
                            href="mailto:aiestatedubai5@gmail.com"
                            className="inline-flex items-center space-x-2 px-6 py-3 bg-secondary text-primary rounded-lg font-cta font-semibold hover:scale-105 transition-all duration-300"
                        >
                            <Mail size={20} />
                            <span>aiestatedubai5@gmail.com</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}