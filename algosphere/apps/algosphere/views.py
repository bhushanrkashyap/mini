from django.shortcuts import render


def dashboard(request):
    return render(request, 'algosphere/dashboard.html')


def arrays(request):
    return render(request, 'algosphere/arrays.html')


def stacks(request):
    return render(request, 'algosphere/stacks.html')


def queues(request):
    return render(request, 'algosphere/queues.html')


def trees(request):
    return render(request, 'algosphere/trees.html')


def graphs(request):
    return render(request, 'algosphere/graphs.html')


def comparison(request):
    return render(request, 'algosphere/comparison.html')
