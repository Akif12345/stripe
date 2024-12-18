import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import Image from 'next/image'

export default function CartDrawer({ isOpen, onClose, cartItems, onRemoveFromCart }) {
  const total = cartItems.reduce((sum, item) => sum + item.currentPrice * item.quantity, 0)

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-10rem)] mt-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center space-x-4 py-2">
              <Image
                src={item.image}
                alt={item.name}
                width={60}
                height={60}
                className="rounded-md"
              />
              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-muted-foreground">
                  ${item.currentPrice} x {item.quantity}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemoveFromCart(item.id)}
              >
                Remove
              </Button>
            </div>
          ))}
        </ScrollArea>
        <div className="mt-4">
          <div className="flex justify-between items-center mb-4">
            <span className="font-medium">Total:</span>
            <span className="font-bold">${total.toFixed(2)}</span>
          </div>
          <Button className="w-full">Checkout</Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

