import { IconGithub, IconInstagram } from '../../components/icons';

export default function Footer() {
    return (
        <div className="container mx-auto mt-4 flex gap-2 px-4 py-4">
            <IconInstagram />
            <IconGithub />
        </div>
    );
}
