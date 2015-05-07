# Demo Meetup Laravel #3
Demonstração de orquestração de containers apresentado no Meetup Laravel SP #3 

## Aplicação
Foi utilizado o framework *Laravel 5* com uma rota e um controller onde exibimos uma foto e um botão de curtir. Esse botão nos leva a uma ação de armazenar as curtidas no *cache*. Além do cache gravamos uma mensagem numa *fila* para uma execução assíncrona.

## Cache
O cache server utilizado como na lightning talk anterior foi o redis.

## Fila
O serviço de fila configurado foi o RabbitMQ.

## Infraestrutura
Com o Docker Compose conseguimos simular um redis server, um rabbitmq server, um proxy server para gerenciar os requests como um load balancer e um servidor web (Nginx + PHP-FPM) que conseguimos escalar.
