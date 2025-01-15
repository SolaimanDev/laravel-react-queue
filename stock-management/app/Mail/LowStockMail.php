<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class LowStockMail extends Mailable
{
    use Queueable, SerializesModels;
    public $product;
    /**
     * Create a new message instance.
     */
    public function __construct($product)
    {
        $this->product = $product;
    }

    /**
     * Get the message envelope.
     */
    public function build()
    {
        return $this->subject('Low Stock Alert')
                    ->view('emails.low_stock')
                    ->with([
                        'productName' => $this->product->name,
                        'productStock' => $this->product->stock,
                        'minimumStock' => $this->product->minimum_stock_quantity,
                    ]);
    }
}
