import { Button, DropdownMenu } from "@radix-ui/themes";

interface VersionProps {
    versions: number[],
    onSelectVersion: (version: number) => void,
    currentVersion: number | undefined
}

export const VersionDropdown = ({ versions, onSelectVersion, currentVersion }: VersionProps) => {
    /* Base variables */
    const latestVersion = Math.max(...versions);
    const activeVersion = currentVersion ?? versions[0];

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <Button variant="ghost">
                    Version {activeVersion} {latestVersion ? '(latest)' : ''}
                    <DropdownMenu.TriggerIcon />
                </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
                {versions.map((version) => {
                    const isLatest = version === latestVersion;

                    return (
                        <DropdownMenu.Item
                            key={`version-${version}`}
                            onSelect={() => onSelectVersion(version)}
                        >
                            Version {version} {isLatest ? '(latest)' : ''}
                        </DropdownMenu.Item>
                    )
                })}
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    )
}