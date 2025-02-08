"use client";

import { Button } from "@/components/ui/button";
import { 
    Card, 
    CardContent, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card";

const SettingsPage = () => {
  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
            <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                <CardTitle className="text-xl line-clamp-1">
                    Settings
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {/* Bank Account Section */}
                    <div className="flex flex-col space-y-2 pb-4 border-b">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-medium">Bank account</h3>
                                <p className="text-sm text-muted-foreground">
                                    Bank account connected
                                </p>
                            </div>
                            <Button variant="destructive">
                                Disconnect
                            </Button>
                        </div>
                    </div>

                    {/* Subscription Section */}
                    <div className="flex flex-col space-y-2">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-medium">Subscription</h3>
                                <p className="text-sm text-muted-foreground">
                                    Subscription active
                                </p>
                            </div>
                            <Button variant="outline">
                                Manage Subscription
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card> 
    </div>
  )
}

export default SettingsPage;